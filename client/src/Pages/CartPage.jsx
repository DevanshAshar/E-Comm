import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const user = auth.user; 

  const handleQuantityChange = async (item, value) => {
    const updatedCart = [...user.cart];
    const index = updatedCart.findIndex((cartItem) => cartItem._id === item._id);
    if (index !== -1) {
      updatedCart[index].quantity += value;
      setAuth({ ...auth, user: { ...user, cart: updatedCart } });
    }
    try {
      await axios.post(`${process.env.REACT_APP_API}/product/updCart`, { pid: item.pid, quantity: updatedCart[index].quantity });
      
    } catch (error) {
      console.log(error);
    }
  };

  const getAuth = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/user/auth`);
      console.log(res.data);
      setAuth({ token: res.data.token, user: res.data.user });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/product/getCart`);
      const cartData = response.data;
      setAuth({ ...auth, user: { ...user, cart: cartData } });;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuth();
    fetchCartData();
  }, []);

  useEffect(() => {
    if (user && user.cart && user.cart.length === 0) {
      fetchCartData();
    }
  }, [user?.cart]); 

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 m-2">{`Hello ${auth.user?.username || ""}`}</h1>
            {user?.cart && user.cart.length === 0 ? <h4>No Products in cart</h4> : null}
          </div>
        </div>
        {user?.cart && user.cart.length > 0 ? (
          <div className="row">
            <div className="col-md-9">
              {user.cart.map((item) => (
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
                      <button
                        className="btn btn-sm btn-primary me-1"
                        onClick={() => handleQuantityChange(item, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-primary ms-1"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="btn btn-primary ms-1" style={{margin:'15px'}} onClick={() => navigate(`/product/${item.pid}`)}>
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-3">Checkout</div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default CartPage;
