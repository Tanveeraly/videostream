class ApiError extends Error {

   constructor (

 statusCode,
 message="Something went wrong",
  statck="",
  errors=[]

)
{

super(message)
this.message=message,
this.statusCode=statusCode,
this.stack=statck,
this.data= null,
this.sucess =false;
this.errors=errors




if (statck)
{
this.stack=statck

}

else {

Error.captureStackTrace(this,this.constructor)

}

}}
export {ApiError}