import React, { useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/signup.css'
const Signup = () => {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [mobile,setMobile]=useState("")
  const [address,setAddress]=useState("")
  const navigate=useNavigate()
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={async (e)=>{e.preventDefault()
        try {
          const role='customer'
          const res=await axios.post(`http://localhost:5000/user/newUser`,{username,email,password,mobile,address,role})
          console.log(res)
          if(res.status===200)
          {
          toast.success('Registered Successfully')
          navigate('/login')
        }
          }
         catch (error) {
          console.log(error)
          toast.error("Something went wrong")
        }}}>
          <h1 style={{color:'purple'}} className="title">Signup</h1>
          <div className="my-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername"
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
              placeholder="Username"
            />
          </div>
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
            <div className="my-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputMobile"
              value={mobile}
              onChange={(e)=>{setMobile(e.target.value)}}
              placeholder="Mobile"
            />
            </div>
            <div className="my-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              value={address}
              onChange={(e)=>{setAddress(e.target.value)}}
              placeholder="Address"
            />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
