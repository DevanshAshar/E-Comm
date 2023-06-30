import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/images.css'
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({}); // we use object because there is only single prod
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [similar,setSimilar]=useState([])
  const navigate=useNavigate()
  const getProd = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/prodname/${params.pid}`
      );
      setProduct(data?.product);
      getSimilar(data?.product._id,data?.product.category)
    } catch (error) {
      console.log(error);
    }
  };
  const getProdImages = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/prodImage/${params.pid}`
      );
      setImages(data);
      setLoading(false); 
    } catch (error) {
      console.log(error);
    }
  };
  const getSimilar=async(pid,category)=>{
    try {
        const {data}=await axios.get(`${process.env.REACT_APP_API}/product/similarProd/${pid}/${category}`)
        setSimilar(data?.products)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    if (params?.pid) {
      getProd();
      getProdImages();
    }
  }, [params?.pid]);
  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Update the current index to show the next image
  };
  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Update the current index to show the previous image
  };
  return (
    <Layout>
    <div className="row container">
      <div className="col-md-6 image-container">
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : images.length > 0 ? (
          <>
            <img
              src={`data:${images[currentIndex].contentType};base64,${images[currentIndex].data}`}
              alt={`Product Image ${currentIndex}`}
              className="product-image"
              style={{ width: "100%", height: "auto", margin: "5px", padding: "5px" }}
            />
            <div className="arrow-buttons">
              {currentIndex > 0 && (
                <button onClick={showPreviousImage} className="arrow-button previous-button">
                  <img src="https://w7.pngwing.com/pngs/518/133/png-transparent-left-arrow-button-direction-back-reverse-previous-free-vector-graphics-thumbnail.png" style={{ width: "20px", height: "auto" }} />
                </button>
              )}
              {currentIndex < images.length - 1 && (
                <button onClick={showNextImage} className="arrow-button next-button" >
                  <img src="data:image/jpeg;base64,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" style={{ width: "20px", height: "auto" }} />
                </button>
              )}
            </div>
          </>
        ) : (
          <p>No images found for the product</p>
        )}
      </div>
      <div className="col-md-6">
        <h1 className="text-center mt-4">Product Details</h1>
        <h6 className="mt-4">Name: {product.prodName}</h6>
        <h6>Brand: {product.brand}</h6>
        <h6>Category: {product.category}</h6>
        <h6>Price: ₹{product.price}</h6>
        <h6>Description: {product.description}</h6>
        <button class="btn btn-secondary ms-1 mt-3" style={{backgroundColor:'green'}}>Add to Cart</button>  
      </div>
    </div>
    <hr className="mt-5"/>
    <div className="row container m-5">
        <h2>
        Similar Products
        </h2>
        {similar.length<1 && (<p className="text-center">No Similar Products found</p>) }
        <div className="d-flex flex-wrap">
            <div className='flex-wrap' style={{display:"flex"}}>
                {similar?.map(p=>(                    
                    <div className="card m-2" style={{width: "18rem",border:"solid purple"}} key={p._id}>
                    {(
                      <img
                        src={`${process.env.REACT_APP_API}/product/firstImage/${p._id}`}
                        className="card-img-top"
                        alt={p.prodName}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{p.prodName}</h5>
                      <p className="card-text">{p.description.substring(0,30)}...</p> 
                      <p className="card-text">₹{p.price}</p> 
                      <button class="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p._id}`)}>View</button>     
                      <button class="btn btn-secondary ms-1">Add to Cart</button>             
                    </div>
                  </div>
                ))}
            </div>
            </div>
    </div>
  </Layout>  
  );
};

export default ProductDetails;
