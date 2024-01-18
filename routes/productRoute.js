const express = require("express");
const {
  getProductValidotor,
  createProductValidotor,
  updateProductValidotor,
  deleteProductValidotor,
} = require("../utils/validators/productValidator");

const productRouter = express.Router();

const {
  getProducts,
  creatProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

productRouter.route("/").post(createProductValidotor, creatProduct).get(getProducts);
productRouter.route("/:id")
  .get(getProductValidotor, getProduct)
  .put(updateProductValidotor, updateProduct)
  .delete(deleteProductValidotor, deleteProduct);

module.exports = { productRouter };
