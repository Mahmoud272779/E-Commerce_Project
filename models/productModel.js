const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "too short title"],
      maxlength: [100, "too long title"],
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, "description is required"],
      minlength: [3, "too short description"],
      maxlength: [2000, "too long description"],
    },

    quantity: {
      type: Number,
      required: [true, "quantity is required"],
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too long product price"],
    },

    priceAfterDiscount: {
      type: Number,
    },

    colors: [String],

    imageCover: {
      type: String,
      required: [true, "img cover is required"],
    },

    images: [String],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "product must belong to category"],
    },

    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },

    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal to 1"],
      max: [5, "Rating must be below or equal to 5"],
    },

    ratingsNumber: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

exports.module = productModel ;
