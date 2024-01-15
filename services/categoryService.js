const { categoryModel } = require("../models/categoryModel");
const ApiError = require("../utils/apiError");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); // Replace with the actual library you're using

exports.getCategories = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const { pagelimit } = req.query;

  const allCategories = await categoryModel
    .find({})
    .skip((page - 1) * pagelimit)
    .limit(pagelimit);
  res
    .status(201)
    .json({ dataCount: allCategories.length, data: allCategories });
});

exports.creatCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(`name: ${name}`);
  const category = await categoryModel.create({ name, slug: slugify(name) });

  res.status(201).json({ data: category });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(`id: ${id}`);
  const category = await categoryModel.findById(id);

  if (!category) {
    return next(new ApiError(`can't find category with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: category });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(`id: ${id}`);
  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    return next(new ApiError(`can/'t find category with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: category });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  console.log(`id: ${id}`);
  const category = await categoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(`can/'t find category with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: category });
});
