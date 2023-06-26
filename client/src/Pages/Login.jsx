import React, { useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/signup.css'
import { useAuth } from "../Context/auth";
const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [auth,setAuth]=useAuth()
    const navigate=useNavigate()
    const location=useLocation()
    const forgotPass=async(email)=>{
        if(!email)
        return toast.error("Enter registered email")
        try {
            const res=await axios.post(`${process.env.REACT_APP_API}/user/forgotPass`,{email})
            if(res.status===200)
            navigate('/verifyOtp',{state:email})
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    const subm=async()=>{
        try {
            const role='customer'
            const res=await axios.post(`${process.env.REACT_APP_API}/user/userLogin`,{email,password,role})
            console.log(res)
            if(res.status===200)
            {
            toast.success('Logged in Successfully',{duration:5000})
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate(location.state||'/')
          }
            }
           catch (error) {
            console.log(error)
            toast.error("Something went wrong")
          }
    }
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={async (e)=>{e.preventDefault()
        }}>
          <h1 style={{color:'purple'}} className="title">Login</h1>
          <div className="my-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="Email"
            />
          </div>
          <div className="my-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="Password"
            />
          </div>
          <button onClick={()=>subm()} className="btn btn-primary">
            Login
          </button>
          <button className="btn btn-primary" onClick={()=>forgotPass(email)}>
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login