import React, { useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/signup.css'
import { useAuth } from "../Context/auth";
const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [auth,setAuth]=useAuth()
    const navigate=useNavigate()
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={async (e)=>{e.preventDefault()
        try {
          const role='customer'
          const res=await axios.post(`http://localhost:5000/user/userLogin`,{email,password,role})
          console.log(res)
          if(res.status===200)
          {
          toast.success('Logged in Successfully')
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          })
          localStorage.setItem('auth',JSON.stringify(res.data))
          navigate('/')
        }
          }
         catch (error) {
          console.log(error)
          toast.error("Something went wrong")
        }}}>
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login