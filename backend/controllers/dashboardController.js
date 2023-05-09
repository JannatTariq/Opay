const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Category=require("../models/categoryModel");


exports.getOrderCountByMonth = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $addFields: {
          createdAtDate: {
            $toDate: "$createdAt"
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAtDate" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Could not get order count by month" });
  }
};

exports.getRevenueByMonth = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $addFields: {
          createdAtDate: {
            $toDate: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAtDate" } },
          revenue: { $sum: '$totalPrice' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Could not get revenue by month" });
  }
};


exports.getTopSellingProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productSales = [];

    for (const product of products) {
      const totalSales = await Order.aggregate([
        { $unwind: "$orderItems" },
        {
          $match: {
            "orderItems.product": product._id.toString(), // Convert _id to string
            orderStatus: { $in: ["Delivered", "Processing"] },
          },
        },
        {
          $group: {
            _id: "$orderItems.product",
            totalQuantity: { $sum: "$orderItems.quantity" },
          },
        },
      ]);

      if (totalSales.length > 0) {
        productSales.push({ name: product.name, sales: totalSales[0].totalQuantity });
      }
    }

    const sortedSales = productSales.sort((a, b) => b.sales - a.sales);
    const topSellingProducts = sortedSales.slice(0, 10);

    res.status(200).json(topSellingProducts);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to get top selling products" });
  }
};


exports.getSalesByCategory = async (req, res) => {
  try {
    const orders = await Order.find().populate("orderItems.product");

    const salesByCategory = new Map();

    for (const order of orders) {
      for (const item of order.orderItems) {
        const category = item.product && item.product.category;
        const quantity = item.quantity;
        const revenue = quantity * item.price;

        if (salesByCategory.has(category)) {
          salesByCategory.set(category, salesByCategory.get(category) + revenue);
        } else {
          salesByCategory.set(category, revenue);
        }
      }
    }

    const salesByCategoryArray = Array.from(salesByCategory, ([category, revenue]) => ({
      category,
      revenue,
    }));

    salesByCategoryArray.sort((a, b) => b.revenue - a.revenue);

    res.status(200).json(salesByCategoryArray);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to get sales by category" });
  }
};
