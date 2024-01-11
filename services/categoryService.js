const { categoryModel } = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); // Replace with the actual library you're using

exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page;
  const pagelimit = req.query.pagelimit;

  const allCategories = await categoryModel
    .find({})
    .skip((page - 1) * pagelimit)
    .limit(pagelimit);
  res
    .status(201)
    .json({ dataCount: allCategories.length, data: allCategories });
});

exports.creatCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  console.log(`name: ${name}`);
  const category = await categoryModel.create({ name, slug: slugify(name) });

  res.status(201).json({ data: category });
});

exports.getCategory = asyncHandler(async (req, res) => {
  const  id = req.params.id;
  console.log(`id: ${id}`);
  const category = await categoryModel.findById(id);

  if(!category)
  {
   return res.status(404).json({Error_msg:"this category is not found"});
  }

  return res.status(200).json({ data: category });
});



exports.updateCategory = asyncHandler(async (req, res) => {
  const  id = req.params.id;
  const  name = req.body.name;
  console.log(`id: ${id}`);
  const category = await categoryModel.findOneAndUpdate({_id: id},{name,slug:slugify(name)},{new:true});

  if(!category)
  {
   return res.status(404).json({Error_msg:"this category is not found"});
  }


  return res.status(200).json({ data: category });
});


exports.deleteCategory = asyncHandler(async (req, res) => {
  const  id = req.params.id;
  
  console.log(`id: ${id}`);
  const category = await categoryModel.findByIdAndDelete(id);

  if(!category)
  {
   return res.status(404).json({Error_msg:`this category with id = ${id} is not found`});
  }


  return res.status(200).json({ data: category });
});


