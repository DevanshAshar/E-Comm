const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const Product = require("../models/productSchema");
const User = require("../models/userSchema");
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
    if (product != null) res.send({ product }).status(200);
    else res.status(400).json({ message: "Product not found" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const prodImage = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.pid).select("images");
    if (prod.images.length > 0) {
      const imgArr = prod.images.map((image) => ({
        contentType: image.contentType,
        data: image.data.toString("base64"),
      }));
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
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const prodCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({ total });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const prodList = async (req, res) => {
  try {
    const perPage = 6; //for pagination
    const page = req.params.pid ? req.params.pid : 1;
    const products = await Product.find({})
      .select("-images")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const searchedProd = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product.find({
      $or: [
        { prodName: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ],
    }).select("-images");
    res.status(200).json({ products });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const similarProd = async (req, res) => {
  try {
    const { pid, category } = req.params;
    const products = await Product.find({
      category: category,
      _id: { $ne: pid },
    })
      .select("-images")
      .limit(5);
    res.status(200).json({ products });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const addCart = async (req, res) => {
  try {
    const { pid } = req.body;
    const prod = await Product.findById(pid);
    userData.cart.push({
      pid,
      prodName: prod.prodName,
      price: prod.price,
      quantity: 1,
    });
    await userData.save();
    res.status(200).json({ message: "Added to cart", userData });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const remCart = async (req, res) => {
  try {
    const { pid } = req.body;
    userData.cart = userData.cart.filter((p) => {
      return p.pid && p.pid.toString() !== pid;
    });
    await userData.save();
    res.status(200).json({ message: "Removed from cart", userData });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { pid, quantity } = req.body;
    for (let i = 0; i < userData.cart.length; i++) {
      if (userData.cart[i].pid.toString() === pid) {
        userData.cart[i].quantity = quantity;
      }
    }
    await userData.save();
    res.status(200).json({ message: "Updated", userData });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = userData.cart;
    res.status(200).json({ cart });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const addRev = async (req, res) => {
  try {
    const { rev, rating, pid } = req.body;
    const prod = await Product.findById(pid);
    const numOfRev = prod.reviews.length + 1;
    const newRating = (prod.rating * prod.reviews.length + rating) / numOfRev;
    prod.reviews.push({
      uid: userData._id,
      username: userData.username,
      rating: rating,
      comment: rev,
    });
    prod.numOfRev = numOfRev;
    prod.rating = newRating;
    await prod.save();
    res.status(200).json({ prod });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const editRev = async (req, res) => {
  try {
    const { rev, rating, pid } = req.body;
    const prod = await Product.findById(pid);
    let i = 0;
    console.log(prod.reviews.length);
    const index = prod.reviews.findIndex(
      (review) =>
        review.uid && review.uid.toString() === userData._id.toString()
    );
    if (index !== -1) {
      // Update the review
      prod.reviews[index].rating = rating;
      prod.reviews[index].comment = rev;
      const sumRatings = prod.reviews.reduce((sum, review) => sum + review.rating, 0);
      prod.rating = sumRatings / prod.reviews.length;
      await prod.save();
      res.status(200).json({ prod });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
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
  prodCount,
  prodList,
  searchedProd,
  similarProd,
  addCart,
  remCart,
  updateCart,
  getCart,
  addRev,
  editRev,
};
