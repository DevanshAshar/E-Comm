import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import UserMenu from "../Components/Layouts/UserMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/auth";
import AdminMenu from "../Components/Layouts/AdminMenu";
const AdminOrders = () => {
    const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API}/order/userOrders`
      );
      const orders=resp.data.orders
      setOrders(orders);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(()=>{
    getOrders()
  },[])
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>My Orders</h1>
            {orders && orders.length > 0 ? (
              orders.map((o) => (
                <div className="card">
                  <h5 className="card-header">Status: {o.status}</h5>
                  <div className="card-body">
                    <h5 className="card-title">Ordered on: {o.date}</h5>
                    <p className="card-text">
                    Order id:{o._id}
                    </p>
                    <button onClick={async()=>{
                       try {
                        const response= await axios.post(`${process.env.REACT_APP_API}/order/invoice`,{amount:o.amount,products:o.products,date:o.date,orderId:o._id},{ responseType: 'blob' })
                        const invoiceBlob = new Blob([response.data], { type: 'application/pdf' });
                        const invoiceUrl = URL.createObjectURL(invoiceBlob);
                        const link = document.createElement('a');
                        link.href = invoiceUrl;
                        link.download = `invoice_${o._id}.pdf`;
                        link.click();
                        URL.revokeObjectURL(invoiceUrl);
                       } catch (error) {
                        console.log(error);
                        toast.error('Failed to fetch invoice');
                       }
                    }} className="btn btn-primary">View Invoice</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
