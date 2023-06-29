import React, { useEffect, useState } from 'react'
import AdminMenu from '../Components/Layouts/AdminMenu'
import Layout from '../Components/Layouts/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const AdminProducts = () => {
    const [products,setProducts]=useState([])
    const [images,setImages]=useState([])
    const getProducts=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/product/allProducts`)
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    useEffect(()=>{
        getProducts()
    },[])
  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-2">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className="text-center">All Products</h1>
                <div className='flex-wrap' style={{display:"flex"}}>
                {products?.map(p=>(
                    <Link key={p._id} to={`/dashboard/admin/product/${p._id}`} style={{textDecoration:'none',color:'black'}}>
                    <div className="card m-2" style={{width: "18rem"}} key={p._id}>
                    {(
                      <img
                        src={`${process.env.REACT_APP_API}/product/firstImage/${p._id}`}
                        className="card-img-top"
                        alt={p.prodName}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{p.prodName}</h5>
                      <p className="card-text">{p.description}</p>              
                    </div>
                  </div>
                  </Link>
                ))}
            </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default AdminProducts