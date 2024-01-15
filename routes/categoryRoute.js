
const express=require('express');
const {getCategoryValidotor,createCategoryValidotor,updateCategoryValidotor,deleteCategoryValidotor}=require('../utils/validators/categoryValidator');

const categoryRouter=express.Router();
const {getCategories,creatCategory,getCategory,updateCategory,deleteCategory}=require('../services/categoryService');





categoryRouter.route('/').post(createCategoryValidotor,creatCategory)
.get(getCategories);
categoryRouter.route('/:id').get(getCategoryValidotor,getCategory)
.put(updateCategoryValidotor,updateCategory)
.delete(deleteCategoryValidotor,deleteCategory);


module.exports={categoryRouter};