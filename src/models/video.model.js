
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const videoSchema= new Schema(
 {
   videoFile:{
    type:String,
    required:true
   },

   thumbNail:{
    type:String,
    required:true
   },

   onwer:{
    type:Schema.Types.ObjectId,
    ref:"user"
   },

   title:{
    type:String,
    required:true
   },

   videoFile:{
    type:String,
    required:true
   },
   duration:{
    type:Number,
    required:true
   },

   views:{
    type:Number,
    default:0
   },
   isPublished:{
    type:Boolean,
    default:true
   },

 },
 {
    timestamps:true
 }

)

export const Vedio=mongoose.model("Video",videoSchema)