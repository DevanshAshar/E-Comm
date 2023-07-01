import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/auth";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth()
  const categories = [
    "Laptops",
    "Mobiles",
    "Televisions",
    "Refrigerators",
    "Microwaves",
    "Earphones",
  ];
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/prodList/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/totalCount`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  const productInCart=(pid)=>{
    const user=auth.user
    let i=0
    const cart=user.cart
    for(i=0;i<user.cart.length;i++)
    {
      if(pid===cart[i].pid)
      return true
    }
    return false
  }
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/prodList/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const addToCart=async(pid)=>{
    try {
      const res=await axios.post(`${process.env.REACT_APP_API}/product/addCart`,{pid})
      if(res.status===200)
      {
      toast.success("Item added to cart")
      setAuth({...auth,user:res.data.userData})
      }
      else
      toast.error("Something went wrong")
    } catch (error) {
      console.log(error)
      window.location.reload();
      toast.error("Something went wrong")
    }
  }
  const remFromCart=async(pid)=>{
    try {
      const res=await axios.post(`${process.env.REACT_APP_API}/product/remCart`,{pid})
      if(res.status===200)
      {
      toast.success("Item Removed From Cart")
      setAuth({...auth,user:res.data.userData})
      }
      else
      toast.error("Something went wrong")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
      window.location.reload(); 
    }
  }
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const handleFilter = (value, category) => {
    let chk = [...check];
    if (value) chk.push(category);
    else chk = chk.filter((c) => c !== category);
    setCheck(chk);
  };
  const filterProds = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/product/filterProducts`,
        { check, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!check.length || !radio.length) getProducts();
  }, [check.length, radio.length]);
  useEffect(() => {
    if (check.length || radio.length) filterProds();
  }, [check, radio]);
  useEffect(() => {
    getTotal();
  }, []);
  return (
    <Layout>
      <div className="row m-5">
        <div className="col-md-2">
          <h5 className="text-center">Filter by Categoty</h5>
          <div className="d-flex flex-column">
            {categories?.map((category) => (
              <Checkbox
                key={category}
                onChange={(e) => handleFilter(e.target.checked, category)}
              >
                {category}
              </Checkbox>
            ))}
          </div>
          <h5 className="text-center mt-4">Filter by Price</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            <div className="flex-wrap" style={{ display: "flex" }}>
              {products && products.length > 0 ? (
                products?.map((p) => (
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
                      <p className="card-text">₹{p.price}</p>
                      <button
                        class="btn btn-primary ms-1"
                        onClick={() => navigate(`/product/${p._id}`)}
                      >
                        View
                      </button>
                      {auth.user.cart.length>0 && productInCart(p._id)?(<button
                        className="btn btn-secondary ms-1"
                        style={{backgroundColor:'red'}}
                        onClick={() => remFromCart(p._id)}
                      >
                        Remove From Cart
                      </button>):(<button
                        className="btn btn-secondary ms-1"
                        style={{backgroundColor:'green'}}
                        onClick={() => addToCart(p._id)}
                      >
                        Add to Cart
                      </button>)}                      
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No Products Found</p>
              )}
            </div>
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && products.length > 0 && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
