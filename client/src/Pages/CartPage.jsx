import React from "react";
import Layout from "../Components/Layouts/Layout";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const [cart,setCart]=useCart()
    const [auth,setAuth]=useAuth()
    const navigate=useNavigate()
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 m-2">
                {`Hello ${auth?.token && auth?.user?.username}`}
            </h1>
            <h4 className="text-center">
                {cart?.length}
            </h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
