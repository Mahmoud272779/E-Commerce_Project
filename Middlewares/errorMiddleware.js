const globalError = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") 

 return res.status(err.statuscode).json({
    status: err.status,
    err: err,
    msg: err.message,
    stack: err.stack,
  });

  else
  return res.status(err.statuscode).json({
    status: err.status,
    
    msg: err.message,
    
  });
};

module.exports = globalError;
