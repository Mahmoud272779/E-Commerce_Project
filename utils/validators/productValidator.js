const { check } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validationMiddleware");

const { categoryModel } = require("../../models/categoryModel");
const { subCategoryModel } = require("../../models/subCategoryModel");
const ApiError = require("../apiError");

exports.createProductValidotor = [
  check("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("title must be between 3 : 100 letters"),

  check("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 3, max: 2000 })
    .withMessage("description must be between 3 : 2000 letters"),

  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((val, { req }) => {
      if (val >= req.body.price)
        throw new Error("priceAfterDiscount must be lower than price");
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),

  check("imageCover").notEmpty().withMessage("Product imageCover is required"),

  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),

  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((val) =>
      categoryModel.findById(val).then((c) => {
        if (!c) {
          throw new Error(`No category for this id: ${val}`);
        }
        return true;
      })
    ),

  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subcats) =>
      subCategoryModel
        .find({ _id: { $exists: true, $in: subcats } })
        .then((results) => {
          if (results.length !== subcats.length) {
            throw new Error("Invalid subcategories IDs");
          }
          return true;
        })
    )
    .custom((val, { req }) =>
      subCategoryModel
        .find({ category: req.body.category })
        .then((subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          // check if subcategories ids in db include subcategories in req.body (true)
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`subcategories not belong to category`)
            );
          }
        })
    ),

  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("Rating must be between 1.0 and 5.0"),

  check("ratingsNumber")
    .optional()
    .isNumeric()
    .withMessage("ratingsNumber must be a number"),

  validatorMiddleware,
];

exports.updateProductValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];

exports.deleteProductValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];

exports.getProductValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];
