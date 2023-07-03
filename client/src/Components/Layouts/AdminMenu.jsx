import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
    <div className="text-center">
      <div className="list-group">
        <h4>Admin Panel</h4>
        <NavLink to="/dashboard/admin/addProduct" className="list-group-item list-group-item-action">
          Add Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
          All Products
        </NavLink>
        <NavLink to="/dashboard/admin/allOrders" className="list-group-item list-group-item-action">
          All Orders
        </NavLink>
        <NavLink to="/dashboard/admin/myOrders" className="list-group-item list-group-item-action">
          My Orders
        </NavLink>
      </div>
      </div>
    </>
  );
};

export default AdminMenu;
