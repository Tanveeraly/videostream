import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const userSchema = new Schema (

{
    username: {
        type: String,
        required: true,
        unique:true,
        lowercase :true,
        trim:true,
        index:true
    }
,
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase :true,
        trim:true,
    },

    fullname: {
        type: String,
        required: true,
        trim:true,
        index:true
    },

    avatar: {
        type: String,//we can use url to load the imgage from third party 
        required: true,

    },

    coverimgae: {
        type: String,
        
    },

    watchHistory:[
         {
          type:Schema.Types.ObjectId,
          ref:'Video'


         }

    ],

    password:{
          
        type:String,
        required:[true,'Password is required']
    },

    refreshToken:{

       type:String,

    }  
},
{
    timestamps:true
}

)

userSchema.pre("save", async funtion(next){
     if (!this.isModified("password")) return next()
    this.password=bcrypt.hash(this.password,10)
    next()

})
// to check the password is is correct we use a method
// result will be true or false
userSchema.methods.passwordValidator = async funtion(password){
  
  return await bcrypt.compare(password,this.password)

}
     
userSchema.methods.generateAccessToken=funtion(){
 jwt.sign({
    id:this.id,
    email:this.email,
    fullname:this.fullname,
 },
 process.env.ACCESS_TOKEN_SECRET,
 {
    expireIn:process.env.ACCESS_EXPIRY
 }

)
}

export const User = mongoose.model("User,userSchema")