const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");
const ApiError = require("../utils/apiError");

exports.getProducts = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const { pagelimit } = req.query;

  const allProducts = await productModel.module
    .find({})
    .skip((page - 1) * pagelimit)
    .limit(pagelimit)
    .populate({ path: "category", select: "name -_id" });
  res.status(201).json({ dataCount: allProducts.length, data: allProducts });
});

exports.creatProduct = asyncHandler(async (req, res) => {
  console.log("---------------");
  req.body.slug = slugify(req.body.title);
  console.log(req.body.category);
  const product = await productModel.module.create(req.body);
  res.status(201).json({ data: product });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(`id: ${id}`);
  const product = await productModel.module
    .findById(id)
    .populate({ path: "category", select: "name -_id" });

  if (!product) {
    return next(new ApiError(`can't find product with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);
  console.log(`id: ${id}`);
  const product = await productModel.module.findOneAndUpdate(
    { _id: id },
    req.body,
    {
      new: true,
    }
  );

  if (!product) {
    return next(new ApiError(`can/'t find product with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: product });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  console.log(`id: ${id}`);
  const product = await productModel.module.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`can/'t find product with id: ${id}.`, 404));
  }

  return res.status(200).json({ data: product });
});
