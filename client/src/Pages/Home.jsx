import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layouts/Layout'
import axios from 'axios'
import {Checkbox,Radio} from "antd"
import { Prices } from '../Components/Prices'
const Home = () => {
  const [products,setProducts]=useState([])
  const [check,setCheck]=useState([])
  const [radio,setRadio]=useState([])
  const categories=['Laptops','Mobiles','Televisions','Refrigerators','Microwaves','Earphones']
  const getProducts=async()=>{
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/product/allProducts`)
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }
  const handleFilter=(value,category)=>{
    let chk=[...check]
    if(value)
    chk.push(category)
    else
    chk=chk.filter((c)=>c!==category)
    setCheck(chk)
  }
  const filterProds=async()=>{
    try {
      const {data}=await axios.post(`${process.env.REACT_APP_API}/product/filterProducts`,{check,radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(!check.length || !radio.length)
    getProducts()
  },[check.length,radio.length])
  useEffect(()=>{
    if(check.length || radio.length)
    filterProds()
  },[check,radio])
  return (
    <Layout>
        <div className="row m-5">
          <div className="col-md-2">
            <h5 className='text-center'>Filter by Categoty</h5>
            <div className="d-flex flex-column">
            {categories?.map(category=>(
              <Checkbox key={category} onChange={(e)=>handleFilter(e.target.checked,category)}>
                {category}
              </Checkbox>
            ))}
            </div>
            <h5 className='text-center mt-4'>Filter by Price</h5>
            <div className="d-flex flex-column">
              <Radio.Group onChange={e=>setRadio(e.target.value)}>
                
                {Prices?.map((p)=>(
                  <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
                
              </Radio.Group>             
            </div>
            <div className='d-flex flex-column'>
              <button className='btn btn-danger' onClick={()=>window.location.reload()}>Reset Filters</button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>All Products</h1>
            <div className="d-flex flex-wrap">
            <div className='flex-wrap' style={{display:"flex"}}>
                {products?.map(p=>(                    
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
                      <button class="btn btn-primary ms-1">View</button>     
                      <button class="btn btn-secondary ms-1">Add to Cart</button>             
                    </div>
                  </div>
                ))}
            </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Home