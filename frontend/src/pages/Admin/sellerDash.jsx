import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {MetaData, Loader} from '../../components/allComponents'
import {Sideba} from '../allpages'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import styles from '../../adminDashboard.module.css';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Bar,BarChart, Tooltip, Legend } from 'recharts';


const SellerDashboard = () => {


    return (
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sideba />
                </div>
</div>
        </>
    )
};

export default SellerDashboard;