const express = require("express");
const {
  createSubCategoryValidotor,
  getSubCategoryValidotor,
  updateSubCategoryValidotor,
  deleteSubCategoryValidotor,
} = require("../utils/validators/subCategoryValidator");

const subCategoryRouter = express.Router({ mergeParams: true });
const {
  creatSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createFilterObj,
  setCategoryToBody
} = require("../services/subCategoryService");

subCategoryRouter
  .route("/")
  .post(setCategoryToBody,createSubCategoryValidotor, creatSubCategory)
  .get(createFilterObj, getSubCategories);

subCategoryRouter
  .route("/:id")
  .get(getSubCategoryValidotor, getSubCategory)
  .put(updateSubCategoryValidotor, updateSubCategory)
  .delete(updateSubCategoryValidotor, deleteSubCategory);

module.exports = { subCategoryRouter };
