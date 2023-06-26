import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layouts/Layout";
import toast from 'react-hot-toast'
const VerifyOtp = () => {
    const [otp,setOtp]=useState()
    const navigate=useNavigate()
    const location=useLocation()
    const subm=async(email,otp)=>{
        try {
                const res=await axios.post(`${process.env.REACT_APP_API}/user/verifyOtp`,{email,otp})
                if(res.status===200)
                {
                    toast.success('OTP Verified')
                    navigate('/newPass',{state:email})
                }
            }
           catch (error) {
            console.log(error)
            toast.error("Something went wrong")
          }
    }
  return( 
    <Layout>
       <div className="form-container">
        <form onSubmit={async (e)=>{e.preventDefault()
        }}>
          <h1 style={{color:'purple'}} className="title">Verify Otp</h1>
          <div className="my-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputOtp"
              value={otp}
              onChange={(e)=>{setOtp(e.target.value)}}
              placeholder="Enter OTP sent on your registered email"
            />
          </div>
          <button onClick={()=>subm(location.state,otp)} className="btn btn-primary">
            Verify
          </button>
          <div>
            OTP valid for only 5 mins
          </div>
        </form>
      </div>
    </Layout>
  )
};

export default VerifyOtp;
