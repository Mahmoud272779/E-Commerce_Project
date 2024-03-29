const { check } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validationMiddleware");

exports.getCategoryValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];

exports.createCategoryValidotor = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name must be between 3 : 32 letters"),
  validatorMiddleware,
];

exports.updateCategoryValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];

exports.deleteCategoryValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];
