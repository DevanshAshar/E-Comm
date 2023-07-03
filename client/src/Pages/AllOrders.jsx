import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/auth";
import axios from "axios";
import AdminMenu from "../Components/Layouts/AdminMenu";
const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API}/order/allOrders`
      );
      const orders = resp.data.orders;
      setOrders(orders);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleStatusChange = async (event, orderId) => {
    try {
      const resp = await axios.patch(
        `${process.env.REACT_APP_API}/order/updateOrder`,
        { status: event.target.value, orderId: orderId }
      );
      const orders = resp.data.orders;
      setOrders(orders);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
            {orders && orders.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order._id}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(e, order._id)}
                        >
                          <option value="In Process">In Process</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllOrders;
