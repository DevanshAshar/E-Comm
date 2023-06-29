const express = require("express");
const app = express();
app.use(express.json());
const Product = require("../models/productSchema");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

const newProduct = async (req, res) => {
  try {
    const { prodName, brand, description, price, category, stock } = req.fields;
    const { images } = req.files;

    const prod = new Product(req.fields);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        console.log(i);
        console.log(image);
        prod.images.push({
          data: fs.readFileSync(image.path),
          contentType: image.type,
        });
      }
    }

    await prod.save();

    res.json({ message: "Success", prod }).status(200);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const products = async (req, res) => {
  try {
    let products = await Product.find({})
      .select("-images")
      .sort({ createdAt: -1 });
    res
      .send({ message: "All Products", totalCount: products.length, products })
      .status(200);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const prodname = async (req, res) => {
  try {
    let product = await Product.findById(req.params.pid).select("-images");
    if (product != null) res.send(product).status(200);
    else res.status(400).json({ message: "Product not found" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const prodImage = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.pid).select("images");
    if (prod.images.length > 0) {
      // const imagePromises = prod.images.map(async (image) => {
      //   if (image.data) {
      //     return {
      //       data: image.data,
      //       contentType: image.contentType,
      //     };
      //   }
      // });
      // const images = await Promise.all(imagePromises);
      const imgArr = prod.images.map((image) => ({
        contentType: image.contentType,
        data: image.data.toString("base64"),
      }));
      //res.set('Content-Type', prod.images[0].contentType)
      res.status(200).send(imgArr);
    } else {
      res.status(400).json({ message: "No images found for the product" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const firstImage = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.pid).select("images");
    if (prod.images.length > 0) {
      const imagePromises = prod.images.map(async (image) => {
        if (image.data) {
          return {
            data: image.data,
            contentType: image.contentType,
          };
        }
      });
      const images = await Promise.all(imagePromises);
      res.set("Content-Type", prod.images[0].contentType);
      res.status(200).send(prod.images[0].data);
    } else {
      res.status(404).json({ message: "No images found for the product" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteProd = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-images");
    res.json({ message: "product deleted" }).status(200);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateProd = async (req, res) => {
  try {
    const { prodName, brand, description, price, category, stock } = req.fields;
    const images = req.files && req.files.images;

    const prod = await Product.findById(req.params.pid);
    prod.prodName = prodName;
    prod.brand = brand;
    prod.description = description;
    prod.price = price;
    prod.category = category;
    prod.stock = stock;

    if (images) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        console.log(i);
        console.log(image);
        prod.images.push({
          data: fs.readFileSync(image.path),
          contentType: image.type,
        });
      }
    }

    await prod.save();

    res.json({ message: "Success", prod }).status(200);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const filterProducts = async (req, res) => {
  try {
    const { check, radio } = req.body;
    let filters = {};
    if (check.length > 0) filters.category = check;
    if (radio.length) filters.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(filters);
    res.status(200).send({ products });
  } catch (error) {}
};

module.exports = {
  newProduct,
  products,
  prodname,
  firstImage,
  prodImage,
  deleteProd,
  updateProd,
  filterProducts,
};
