const { brandModel } = require("../models/brandModel");
const ApiError = require("../utils/apiError");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); // Replace with the actual library you're using

exports.getBrands = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const { pagelimit } = req.query;

  const allBrands = await brandModel
    .find({})
    .skip((page - 1) * pagelimit)
    .limit(pagelimit);
  res.status(201).json({ dataCount: allBrands.length, data: allBrands });
});

exports.creatBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(`name: ${name}`);
  const brand = await brandModel.create({ name, slug: slugify(name) });

  res.status(201).json({ data: brand });
});

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(`id: ${id}`);
  const brand = await brandModel.findById(id);

  if (!brand) {
    return next(new ApiError(`can't find brand with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: brand });
});

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(`id: ${id}`);
  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(new ApiError(`can't find brand with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: brand });
});

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  console.log(`id: ${id}`);
  const brand = await brandModel.findByIdAndDelete(id);

  if (!brand) {
    return next(new ApiError(`can't find brand with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: brand });
});
