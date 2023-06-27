import React,{useState,useEffect} from 'react'
import Layout from '../Components/Layouts/Layout'
import AdminMenu from '../Components/Layouts/AdminMenu'
const CreateProduct = () => {
    const[images,setImages]=useState([])
    const[prodName,setprodName]=useState()
    const[description,setDescription]=useState()
    const[stock,setStock]=useState()
    const[shipping,setShipping]=useState()
    const[brand,setBrand]=useState()
    const[price,setPrice]=useState()
    const [rating,setRating]=useState()
    const[reviews,setReviews]=useState([])
  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-2">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>CreateProduct</h1>
            <div className='m-1 w-75'>
                <div className="mb-3">
                    <label className='btn btn-outline-secondary col-md-12'>
                        {images?`${images.length} files selected`:"Upload images"}
                        <input type="file" name="images" accept='image/*' onChange={(e)=>setImages(e.target.files)} hidden />
                    </label>
                </div>
                {/* <div className="mb-3">
                    {images}
                </div> */}
            </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct