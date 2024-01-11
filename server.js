const dbConnection=require('./config/database');
const apiError=require('./utils/apiError');
const express=require('express');
const app=express();
app.use(express.json());
const dotenv=require('dotenv');
const {router}=require('./routes/categoryRoute');


const morgan=require('morgan');
const ApiError = require('./utils/apiError');
dotenv.config({path: 'config.env'});
dbConnection();
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);
}





  

app.use('/api/v1/categories',router);


app.all('*',(req,res,next)=>{

    
    next(new apiError(`Cant handle: ${req.originalUrl}`,400));

})


app.use((err,req,res,next)=>{
    err.statuscode= err.statuscode || 500;
    err.status=err.status || 'error';

    res.status(err.statuscode).json({

        status: err.status,
        err:err,
        msg:err.message,
        stack: err.stack

    });
});







app.listen(process.env.PORT,()=>{
    console.log('Server is Listening .....');
});