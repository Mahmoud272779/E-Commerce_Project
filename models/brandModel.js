
const mongoose=require('mongoose');

const brandSchema=new mongoose.Schema({

    name: {
        type:String,
        required:[true,'name is required'],
        unique:[true,'brand must be unique'],
        minlength:[3,'too short'],
        maxlength:[20,'too long']
    },

    slug:{
        type:String,
        lowercase:true
    },
    image:String

  },{timestamps:true});


  const brandModel=mongoose.model('Brand',brandSchema);

  module.exports={brandModel};