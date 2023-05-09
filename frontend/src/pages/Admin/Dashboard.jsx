import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {MetaData, Loader} from '../../components/allComponents'
import {Sidebar} from '../allpages'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import styles from '../../adminDashboard.module.css';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Bar,BarChart, Tooltip, Legend } from 'recharts';


const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)
    const [revenueData, setRevenueData] = useState([]);
  const [orderCountData, setOrderCountData] = useState([]);
  const [topSellingData, setTopSellingData] = useState([]);
  const [salesByCategoryData, setSalesByCategoryData] = useState([]);

  useEffect(() => {
 
    const fetchRevenueData = async () => {
      const response = await axios.get('http://localhost:4000/api/admin-dashboard/revenue');
      setRevenueData(response.data);
    };
  
    const fetchOrderCountData = async () => {
      const response = await axios.get('http://localhost:4000/api/admin-dashboard/orders');
      const formattedData = response.data.map((item) => ({
        month: item._id,
        orderCount: item.count
      }));
      setOrderCountData(formattedData);
    };
    
  
    const fetchTopSellingData = async () => {
      const response = await axios.get('http://localhost:4000/api/admin-dashboard/topSelling');
      setTopSellingData(response.data);
    };
  
    const fetchSalesByCategoryData = async () => {
      const response = await axios.get('http://localhost:4000/api/admin-dashboard/sales');
      const formattedData = response.data.map((item) => ({
        category: item.category,
        sales: item.revenue
      }));
      setSalesByCategoryData(formattedData);
    };
    

    fetchRevenueData();
    fetchOrderCountData();
    fetchTopSellingData();
    fetchSalesByCategoryData();
  }, []);
  

    let outOfStock = 0;
    // products.forEach(product => {
    //     if (product.stock === 0) {
    //         outOfStock += 1;
    //     }
    // })

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(allUsers())
    }, [dispatch])
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard - Opay</h1>

                    {loading ? <Loader /> : (
                        <>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4 ">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100 dashboard__total_amount">
                                        <div className="card-body ">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card__admin text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left" style={{marginRight: '5px'}}>View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card__admin text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left" style={{marginRight: '5px'}}>View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card__admin text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left" style={{marginRight: '5px'}}>View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card__admin text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                
            
            <div className={styles.container}>

  <div className={styles.chartsContainer}>
    <div className={styles.chart}>
      <h2 className={styles.chartHeading}>Revenue by Month</h2>
      <LineChart width={800} height={400} data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </div>
    <div className={styles.chart}>
      <h2 className={styles.chartHeading}>Order Count by Month</h2>
      <LineChart width={800} height={400} data={orderCountData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orderCount" stroke="#82ca9d" />
      </LineChart>
    </div>
    <div className={styles.chart}>
      <h2 className={styles.chartHeading}>Top Selling Products</h2>
      <ul className={styles.productList}>
        {topSellingData.map((product) => (
          <li key={product._id}>
            {product.name} - {product.sales} sales
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.chart}>
      <h2 className={styles.chartHeading}>Sales by Category</h2>
      <BarChart width={800} height={400} data={salesByCategoryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    </div>
  </div>
  </div></div></div>
        </>
    )
};

export default Dashboard;