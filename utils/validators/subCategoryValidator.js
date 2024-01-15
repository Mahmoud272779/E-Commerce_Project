const { check } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validationMiddleware");

exports.createSubCategoryValidotor = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 32 })
    .withMessage("Name must be between 3 : 32 letters"),
  check("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("Invalid category_Id"),
  validatorMiddleware,
];

exports.getSubCategoryValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];

exports.updateSubCategoryValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];

exports.deleteSubCategoryValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];
