
const express=require('express');
const router=express.Router();
const {getCategories,creatCategory,getCategory,updateCategory,deleteCategory}=require('../services/categoryService');





router.route('/').post(creatCategory).get(getCategories);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);


module.exports={router};