import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import AdminMenu from "../Components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [prodName, setprodName] = useState();
  const [description, setDescription] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [reviews, setReviews] = useState([]);
  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setImages(selectedFiles);

    const previewUrls = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      previewUrls.push(URL.createObjectURL(file));
    }
    setPreviewImages(previewUrls);
  };

  const handleCreate = async (e) => {
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
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/product/newProduct`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        //navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
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
                {previewImages.map((imageUrl, index) => (
                  <div className="text-center" key={index}>
                    <img
                      src={imageUrl}
                      alt={`preview-${index}`}
                      height="200px"
                      className="img img-responsive"
                      style={{ padding: "5px" }}
                    />
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary col-md-12"
                  onClick={handleCreate}
                >
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
