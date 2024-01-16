
const express=require('express');
const {getCategoryValidotor,createCategoryValidotor,updateCategoryValidotor,deleteCategoryValidotor}=require('../utils/validators/categoryValidator');

const categoryRouter=express.Router();
const {subCategoryRouter}=require('./subCategoryRoute');
const {getCategories,creatCategory,getCategory,updateCategory,deleteCategory}=require('../services/categoryService');





categoryRouter.route('/').post(createCategoryValidotor,creatCategory)
.get(getCategories);
categoryRouter.route('/:id').get(getCategoryValidotor,getCategory)
.put(updateCategoryValidotor,updateCategory)
.delete(deleteCategoryValidotor,deleteCategory);

categoryRouter.use('/:categoryId/subCategories',subCategoryRouter);




module.exports={categoryRouter};