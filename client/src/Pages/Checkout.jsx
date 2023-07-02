import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const Checkout = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const user = auth.user;
  const [totalAmount, setTotalAmount] = useState(0);
  const getAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }

      const res = await axios.get(`${process.env.REACT_APP_API}/user/auth`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(res.data);
      setAuth({ ...auth, token: res.data.token, user: res.data.user });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/product/getCart`);
      const cartData = response.data;
      setAuth((prevAuth) => ({
        ...prevAuth,
        user: { ...prevAuth.user, cart: cartData },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalAmount = () => {
    let total = 0;
    if (user?.cart && user.cart.length > 0) {
      user.cart.forEach((item) => {
        total += item.price * item.quantity;
      });
    }
    setTotalAmount(total);
  };
  const payment=async()=>{
    try {
        const response=await axios.post(`${process.env.REACT_APP_API}/user/payment`,{amount:totalAmount})
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY, 
            amount: totalAmount*100, 
            currency: "INR",
            order_id: response.id,
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open() 
    } catch (error) {
        console.log(error)
        toast.error("Transaction Failed")
    }
  }
  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    if (auth.token && user && user.cart && user.cart.length === 0) {
      fetchCartData();
    }
  }, [auth.token, user?.cart]);
  useEffect(() => {
    calculateTotalAmount();
  }, [user?.cart]);

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center m-3">Order Details</h1>
        <div className="row">
          <div className="col-md-9">
            {user?.cart && user.cart.length > 0 ? (
              user.cart.map((item) => (
                <div className="row" key={item._id}>
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API}/product/firstImage/${item.pid}`}
                      alt={item.prodName}
                      className="card-img-top"
                    />
                  </div>
                  <div className="col-md-8">
                    <h5>{item.prodName}</h5>
                    <p>Price: ₹{item.price}</p>
                    <div>
                      <span>Quantity={item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4>No Products in cart</h4>
            )}
          </div>
          <div className="col-md-3">
          <h4>Total Amount: ₹{totalAmount}</h4>
            <button
              className="btn btn-primary mb-2"
              style={{ width: "100%",backgroundColor:'green' }}
              onClick={() => payment()}
            >
              Confirm Order
            </button>
            <button
              className="btn btn-danger"
              style={{ width: "100%" }}
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
