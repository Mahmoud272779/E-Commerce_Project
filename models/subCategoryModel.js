const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory must be unique"],
      minlength: [2, "too short subcatogry name "],
      maxlength: [32, "too long subcatogry name "],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      trim: true,
      ref: "Category",
      required: [true, "SubCategory must belong to a parent category"],
    },
  },
  { timestamps: true }
);


const subCategoryModel=mongoose.model('SubCategory',subCategorySchema);

module.exports={subCategoryModel};



