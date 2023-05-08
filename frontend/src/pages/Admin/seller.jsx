import React from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import "./Alladmin.css";
import { FaProductHunt, FaUsers } from "react-icons/fa";
import { RiShoppingBasketLine } from "react-icons/ri";
import { BsStarHalf } from "react-icons/bs";

const Sideba = () => {
  return (
    <div className="sidebar-wrapper">
     
        <ul className="list-unstyled components">
          <li className="single__link_admin">
            <Link
              to="/dashboard1"
              style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >

            </Link>
          </li>


              <li className="single__link_admin collapse__admin">
                <Link
                  to="/admin/product/seller"
                 style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
                >
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>

      
    </div>
  );
};

export default Sideba;
