const mongoose=require('mongoose');

const dbConnection=()=>{ mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`DB is Connected ${mongoose.connection.host}`);
  });
};
module.exports=dbConnection;
  