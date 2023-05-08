const express = require('express');
const router = express.Router();

const {
  getOrderCountByMonth,
  getRevenueByMonth,
  getTopSellingProducts,
  getSalesByCategory
} = require('../controllers/dashboardController');

router.get('/orders', getOrderCountByMonth);
router.get('/revenue', getRevenueByMonth);
router.get('/topSelling', getTopSellingProducts);
router.get('/sales', getSalesByCategory);

module.exports = router;
