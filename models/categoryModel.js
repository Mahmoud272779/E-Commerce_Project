
const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({

    name: {
        type:String,
        required:[true,'name is required'],
        unique:[true,'category must be unique'],
        minlength:[3,'too short'],
        maxlength:[20,'too long']
    },

    slug:{
        type:String,
        lowercase:true
    },
    image:String

  },{timestamps:true});


  const categoryModel=mongoose.model('Category',categorySchema);

  module.exports={categoryModel};