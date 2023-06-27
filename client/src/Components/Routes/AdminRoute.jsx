import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../Context/auth'
import { Outlet } from 'react-router-dom'
import Unauthorized from '../../Pages/Unauthorized'
import { toast } from 'react-hot-toast'
const AdminRoute = () => {
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()
    useEffect(()=>{
        const checkAuth=async()=>{
            try {
                const res=await axios.get(`${process.env.REACT_APP_API}/user/adminAuth`)
                if(res.status===200)
                setOk(true)
                else
                setOk(false)
            } catch (error) {
                toast.error('Something went wrong')
            }
        }
        if(auth?.token)
        checkAuth()
        
    },[auth?.token])
  return ok?<Outlet/>:<Unauthorized />
}

export default AdminRoute