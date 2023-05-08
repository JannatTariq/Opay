import React from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import "./Alladmin.css";
import { FaProductHunt, FaUsers,FaShoppingBag } from "react-icons/fa";
import { RiShoppingBasketLine } from "react-icons/ri";
import { BsStarHalf } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li className="single__link_admin">
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >
              <GoHome /> Dashboard
            </Link>
          </li>

          <li className="single__link_admin" style={{ flexDirection: 'column'}}>
          
                <Link
                  to="/admin/products"
                 style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
                >
                  <i className="fa fa-clipboard"></i> All Products
                </Link>
              </li>

          <li className="single__link_admin">
            <Link
              to="/admin/orders"
             style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >
              <RiShoppingBasketLine /> Orders
            </Link>
          </li>

          <li className="single__link_admin">
            <Link
              to="/admin/users"
             style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >
              <FaUsers /> Users
            </Link>
          </li>

          <li className="single__link_admin">
            <Link
              to="/admin/reviews"
             style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >
              <BsStarHalf /> Reviews
            </Link>
          </li>

          <li className="single__link_admin">
            <Link
              to="/admin/categories"
             style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >
              <FaShoppingBag /> Categories
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
