const { check } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validationMiddleware");

exports.getBrandValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];

exports.createBrandValidotor = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name must be between 3 : 32 letters"),
  validatorMiddleware,
];

exports.updateBrandValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];

exports.deleteBrandValidotor = [
  check("id").isMongoId().withMessage("Not Valid MongoId."),
  validatorMiddleware,
];
