const {check }= require('express-validator');
const validatorMiddleware=require('../../Middlewares/validationMiddleware');

exports.getCategoryValidotor=[check('id').isMongoId().withMessage("Not Valid MongoId."),validatorMiddleware]