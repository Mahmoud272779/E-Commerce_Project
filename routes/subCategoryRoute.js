const express = require("express");
const {
  createSubCategoryValidotor,
  getSubCategoryValidotor,
  updateSubCategoryValidotor,
  deleteSubCategoryValidotor,
} = require("../utils/validators/subCategoryValidator");

const subCategoryRouter = express.Router();
const {
  creatSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory
} = require("../services/subCategoryService");

subCategoryRouter
  .route("/")
  .post(createSubCategoryValidotor, creatSubCategory)
  .get(getSubCategories);

subCategoryRouter.route("/:id").get(getSubCategoryValidotor, getSubCategory)
.put(updateSubCategoryValidotor,updateSubCategory)
.delete(updateSubCategoryValidotor,deleteSubCategory);

module.exports = { subCategoryRouter };
