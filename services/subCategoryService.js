const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const { subCategoryModel } = require("../models/subCategoryModel");

exports.createFilterObj = (req, res, next) => {
  if (req.params.categoryId) {
    req.filterObj = { category: req.params.categoryId };
  }
  next();
};

exports.setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.creatSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  console.log(`name: ${name}`);
  console.log(`category: ${category}`);
  const Subcategory = await subCategoryModel.create({
    name,
    category,
    slug: slugify(name),
  });

  res.status(201).json({ data: Subcategory });
});

exports.getSubCategories = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const { pagelimit } = req.query;

  console.log(req.params.categoryId);
  const allSubCategories = await subCategoryModel
    .find(req.filterObj)
    .skip((page - 1) * pagelimit)
    .limit(pagelimit);
  res
    .status(201)
    .json({ dataCount: allSubCategories.length, data: allSubCategories });
});

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(`id: ${id}`);
  const subCategory = await subCategoryModel.findById(id);

  if (!subCategory) {
    return next(new ApiError(`can't find category with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: subCategory });
});

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  console.log(`id: ${id}`);
  const Subcategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!Subcategory) {
    return next(new ApiError(`can/'t find Subcategory with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: Subcategory });
});

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  console.log(`id: ${id}`);
  const Subcategory = await subCategoryModel.findByIdAndDelete(id);

  if (!Subcategory) {
    return next(new ApiError(`can/'t find Subcategory with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: Subcategory });
});
