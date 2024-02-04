const express = require("express");
const {
  getBrandValidotor,
  createBrandValidotor,
  updateBrandValidotor,
  deleteBrandValidotor,
} = require("../utils/validators/brandValidator");

const BrandRouter = express.Router();
const {
  getBrands,
  creatBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService ");

BrandRouter.route("/").post(createBrandValidotor, creatBrand).get(getBrands);
BrandRouter.route("/:id")
  .get(getBrandValidotor, getBrand)
  .put(updateBrandValidotor, updateBrand)
  .delete(deleteBrandValidotor, deleteBrand);

module.exports = { BrandRouter };
