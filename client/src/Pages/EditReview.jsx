import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Components/Layouts/Layout";
import axios from 'axios'
import { toast } from "react-hot-toast";
const EditReview = () => {
    const location = useLocation();
  const productId = location.state?.pid;
  const index = location.state?.i;
  const [rating, setRating] = useState(1);
  const [review,setReview]=useState("")
  const handleChange = (event) => {
    setRating(event.target.value);
  };
  const navigate=useNavigate()
  const prev=async(productId,index)=>{
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API}/product/prodname/${productId}`
          );
          const prod=data?.product
          setRating(prod.reviews[index].rating)
          setReview(prod.reviews[index].comment)
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
    }
  }
  useEffect(()=>{
    prev(productId,index)
  },[])
  return (
    <Layout>
        <div style={{ backgroundColor: "lightblue", width: "100vw", height:"80vh" }}>
        <h1 style={{ margin: "15px", color: "purple" }}>Review Product</h1>

        <div style={{ display: "flex", alignItems: "center" }}>
          <h3
            htmlFor="customRange1"
            className="form-label"
            style={{ margin: "15px" }}
          >
            Rate product
          </h3>
          <input
            type="range"
            className="form-range"
            id="customRange1"
            min="1"
            max="5"
            style={{ width: "10vw" }}
            value={rating}
            onChange={handleChange}
          />
        </div>
        <h4 style={{ margin: "15px" }}>Rating: {rating}</h4>
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Review"
          aria-label=".form-control-lg example"
          style={{ width: "20vw", margin: "20px" }}
          value={review}
          onChange={(e)=>setReview(e.target.value)}
        />
        <div style={{margin:"15px"}}>
        <button
          className="btn btn-primary ms-1"
          style={{
            backgroundColor: "purple",
            margin: "15px",
            marginLeft: "auto",
          }}
          onClick={async()=>{
            try {
                const res=await axios.patch(`${process.env.REACT_APP_API}/product/editRev`,{rev:review,rating:rating,pid:productId})
                if(res.status===200)
                {
                    toast.success("Review submitted")
                    navigate(`/product/${productId}`)
                }
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong")
            }
          }}
        >
          Submit
        </button>
        </div>
      </div>
    </Layout>
  )
}

export default EditReview