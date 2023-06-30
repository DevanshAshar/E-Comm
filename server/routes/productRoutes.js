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
  searchedProd
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
module.exports = router;
