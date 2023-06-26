import React, { useState } from 'react'
import Layout from '../Components/Layouts/Layout'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast'
const NewPassword = () => {
    const [pass,setPass]=useState()
    const navigate=useNavigate()
    const location=useLocation()
    const subm=async(email,password)=>{
        try {
                const res=await axios.post(`${process.env.REACT_APP_API}/user/newPass`,{email,password})
                if(res.status===200)
                {
                    toast.success('Password Updated')
                    navigate('/login')
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
          <h1 style={{color:'purple'}} className="title">New Password</h1>
          <div className="my-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputOtp"
              value={pass}
              onChange={(e)=>{setPass(e.target.value)}}
              placeholder="Enter new password"
            />
          </div>
          <button onClick={()=>subm(location.state,pass)} className="btn btn-primary">
            Update Password
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default NewPassword