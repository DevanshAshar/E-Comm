import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const user = auth.user;
  const [cartItems, setCartItems] = useState([]);
    var resp
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 m-2">
              {`Hello ${auth?.token && auth?.user?.username}`}
            </h1>
            {user.cart.length === 0 ? <h4>No Products in cart</h4> : null}
          </div>
        </div>
        {user.cart.length > 0 ? (
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
