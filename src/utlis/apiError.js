class ApiError extends Error {

   constructor (

 statusCode,
 message="Something went wrong",
  stack="",
  errors=[]

)
{

super(message)
this.message=message,
this.statusCode=statusCode,
this.stack=stack,
this.data= null,
this.sucess =false;
this.errors=errors




if (stack)
{
this.stack=stack

}

else {

Error.captureStackTrace(this,this.constructor)

}

}}
export {ApiError}