import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import AdminMenu from "../Components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;
const UpdateProduct = () => {
    const navigate = useNavigate();
    const params=useParams();
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [prodName, setprodName] = useState();
  const [description, setDescription] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [shipping, setShipping] = useState();
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [reviews, setReviews] = useState([]);
  const getProduct=async()=>{
    try {
        const {data}=await axios.get(`${process.env.REACT_APP_API}/product/prodName/${params.pid}`)
        setprodName(data.prodName)
        setDescription(data.description)
        setStock(data.stock)
        setCategory(data.category)
        setShipping(data.shipping)
        setBrand(data.brand)
        setPrice(data.price)
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
    }
  }
  useEffect(()=>{
    getProduct()
    fetchImages()
    //eslint-disable-next-line
  },[])
  const fetchImages=async()=>{
    try {
        const res=await axios.get(`${process.env.REACT_APP_API}/product/prodImage/${params.pid}`)
        const images = res.data.map((image) => ({
            contentType: image.contentType,
            data: `data:${image.contentType};base64,${image.data}`,
          }));
          setImages(images);
          const previewUrls = images.map((image) => image.data);
          setPreviewImages(previewUrls);
    } catch (error) {
        console.log(error)
    }
  }
  const handleImageChange =async (e) => {
    const selectedFiles = e.target.files;
    const newSelectedImages = Array.from(selectedFiles);
    setNewImages(newSelectedImages)
    setImages([...images,...newSelectedImages])
    try {
        const previewUrls = newSelectedImages.map((file) =>
        URL.createObjectURL(file)
    );
    setPreviewImages((prevPreviewImages) => [
      ...prevPreviewImages,
      ...previewUrls,
    ]);
    } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
    }
    
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("prodName", prodName);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("brand", brand);
      productData.append("stock", stock);
      productData.append("category", category);
      for (let i = 0; i < images.length; i++) {
        productData.append("images", images[i]);
      }
      const { data } = axios.put(
        `${process.env.REACT_APP_API}/product/updateProd/${params.pid}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated  Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  const handleDelete=async()=>{
    try {
        let answer=window.prompt('Surely delete this product?(Enter yes to delete else press cancel)')
        if(!answer)
        return
        const {data}=await axios.delete(`${process.env.REACT_APP_API}/product/delete/${params.pid}`)
        toast.success("Product Deleted")
        navigate("/dashboard/admin/products")
    } catch (error) {
        console.log(error);
        toast.error("something went wrong");
    }
  }
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  value={prodName}
                  placeholder="Product Name"
                  className="form-control"
                  onChange={(e) => setprodName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={brand}
                  placeholder="Brand"
                  className="form-control"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={category}
                  placeholder="Category"
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={stock}
                  placeholder="Stock"
                  className="form-control"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  style={{ textDecoration: "bold" }}
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping?"yes":"no"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {images ? `${images.length} files selected` : "Upload images"}
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              </div>
              <div
                className="mb-3 flex-wrap"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                {images?(previewImages.map((imageUrl, index) => (
                    <div className="text-center" key={index}>
                      <img
                        src={imageUrl}
                        alt={`preview-${index}`}
                        height="200px"
                        className="img img-responsive"
                        style={{ padding: "5px" }}
                      />
                    </div>
                  ))):(previewImages.map((imageUrl, index) => (
                    <div className="text-center" key={index}>
                      <img
                        src={imageUrl}
                        alt={`preview-${index}`}
                        height="200px"
                        className="img img-responsive"
                        style={{ padding: "5px" }}
                      />
                    </div>
                  )))}
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary col-md-12"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-danger col-md-12"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct