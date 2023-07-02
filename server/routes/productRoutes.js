const express = require("express");
const router = new express.Router();
const multer = require("multer");
const formidable = require("express-formidable");
const {
  newProduct,
  products,
  prodname,
  prodImage,
  deleteProd,
  updateProd,
  firstImage,
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
  editRev
} = require("../controllers/productController");
const authentication = require("../middleware/auth");
router.post(
  "/newProduct",
  authentication.admin,
  formidable({ multiples: true }),
  newProduct
);
router.get("/allProducts", products);
router.get("/prodname/:pid", prodname);
router.get("/prodImage/:pid", prodImage);
router.get("/firstImage/:pid", firstImage);
router.delete("/delete/:pid", authentication.admin, deleteProd);
router.put(
  "/updateProd/:pid",
  authentication.admin,
  formidable({ multiples: true }),
  updateProd
);
router.post("/filterProducts", filterProducts);
router.get("/totalCount",prodCount)
router.get("/prodList/:pid",prodList)
router.get("/searchedProd/:keyword",searchedProd)
router.get("/similarProd/:pid/:category",similarProd)
router.post("/addCart",authentication.verifyToken,addCart)
router.post("/remCart",authentication.verifyToken,remCart)
router.post("/updCart",authentication.verifyToken,updateCart)
router.get("/getCart",authentication.verifyToken,getCart)
router.post("/addRev",authentication.verifyToken,addRev)
router.patch("/editRev",authentication.verifyToken,editRev)
module.exports = router;
