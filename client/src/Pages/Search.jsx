import React from "react";
import Layout from "../Components/Layouts/Layout";
import { useSearch } from "../Context/search";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../Context/auth";
const Search = () => {
  const [value, setValue] = useSearch();
  const [auth, setAuth] = useAuth();
  const productInCart = (pid) => {
    const user = auth.user;
    let i = 0;
    const cart = user.cart;
    for (i = 0; i < user.cart.length; i++) {
      if (pid === cart[i].pid) return true;
    }
    return false;
  };
  const addToCart = async (pid) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/product/addCart`,
        { pid }
      );
      if (res.status === 200) {
        toast.success("Item added to cart");
        setAuth({ ...auth, user: res.data.userData });
      } else toast.error("Something went wrong");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const remFromCart = async (pid) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/product/remCart`,
        { pid }
      );
      if (res.status === 200) {
        toast.success("Item Removed From Cart");
        setAuth({ ...auth, user: res.data.userData });
      } else toast.error("Something went wrong");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h5>
            {value?.products.length < 1
              ? "No Products Found"
              : `Found ${value?.products.length} Products`}
          </h5>
          <div className="d-flex flex-wrap mt-4">
            <div className="flex-wrap" style={{ display: "flex" }}>
              {value?.products.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem", border: "solid purple" }}
                  key={p._id}
                >
                  {
                    <img
                      src={`${process.env.REACT_APP_API}/product/firstImage/${p._id}`}
                      className="card-img-top"
                      alt={p.prodName}
                    />
                  }
                  <div className="card-body">
                    <h5 className="card-title">{p.prodName}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <h6 className="card-text" style={{color:'blue',fontWeight:'bold'}}>₹{p.price}</h6>
                    <div className="card-text">
                      {Array.from({ length: 5 }, (_, index) => {
                        if (index < Math.floor(p.rating)) {
                          // Filled star
                          return (
                            <span key={index} className="star">
                              &#9733;
                            </span>
                          );
                        } else {
                          // Empty star
                          return (
                            <span key={index} className="star">
                              &#9734;
                            </span>
                          );
                        }
                      })}
                    </div>
                    <button class="btn btn-primary ms-1">View</button>
                    {auth.user.cart.length > 0 && productInCart(p._id) ? (
                      <button
                        className="btn btn-secondary ms-1"
                        style={{ backgroundColor: "red" }}
                        onClick={() => remFromCart(p._id)}
                      >
                        Remove From Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary ms-1"
                        style={{ backgroundColor: "green" }}
                        onClick={() => addToCart(p._id)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
