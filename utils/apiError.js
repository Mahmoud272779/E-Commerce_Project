class ApiError extends Error{

    constructor(msg,statuscode){

        super(msg);
        this.statuscode=statuscode;
        this.status=`${statuscode}`.startsWith(String( 4))?"fail":"Error";
        this.isOperational=true

    }

}

module.exports=ApiError;