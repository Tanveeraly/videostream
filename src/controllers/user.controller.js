import { asynHandler } from "../utlis/asynHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utlis/apiError.js";
import { uploadOncloudinary } from "../utlis/cloudinary.js";
import  {ApiResponse} from "../utlis/apiResponse.js";
import jwt from "jsonwebtoken";

const generateRefreshandAccessToken=async(userId)=>{

  try {
  
     const user= await User.findById(userId);
     if(!user) {
      throw new ApiError(404, "User not found");
      }
      
      //console.log("User Object:", user);
      //console.log("AccessToken Method:", typeof user.generateAccessToken);
     // console.log("RefreshToken Method:", typeof user.generateRefreshToken);

     const refreshToken = await user.generateRefreshToken();
     const accessToken = await user.generateAccessToken();
    
     console.log("Generated Refresh Token:", refreshToken);
     console.log("Generated Access Token:", accessToken);
    
      user.refreshToken=  refreshToken; //to save the refresh token in db
      await user.save({validateBeforeSave:false});
    
    return{accessToken,refreshToken}
  
  
  } catch (error) {
    if(error instanceof ApiError){
      throw error;
    }
   
    throw new ApiError(500,"Error while generating Refresh and Access Toke");
    
  }
  
  
    };

const registerUser = asynHandler(async (req, res) => {
  /* USER DATA FROM BACKEND
 2: VALIDATION
 3: CHECK IF THE USER IS ALREADY EXIST IN DATABASE
 3:CHECK FOR IMAGES ,CHECK FOR AVATAR 
 4: sUPLOAD THEM TO CLOUDINARY,AVATAR
 5:CREATE USER OBJECT -CREATE ENTRY IN DATABASE MONGO DB
6:REMOVE PASSWORD AND REFRESH TOKEN FROM RESPONSE
7:CHECK FOR USER CREATION 
8:RETURN REPONSE'
*/

/*
FUNTION TO GENERATE REFRESH AND ACCESSES TOKEN 

*/


  const { fullName, email, username, password } = req.body;
  console.log("Name", fullName);

  if (!fullName || !email || !username || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  const userexist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userexist) {
    throw new ApiError(400, "Email and Username already exist");
  }
  const avatarlocalpath = req.files?.avatar[0]?.path;
  //const coverimagelocalpath=req.files?.coverImage[0]?.path

  if (!avatarlocalpath) {
    throw new ApiError(400, "Avator image is required");
  }

  const avatar = await uploadOncloudinary(avatarlocalpath);
  //const coverImage= await uploadOncloudinary(coverimagelocalpath)

  if (!avatar) {
    throw new ApiError(400, "Avatar image upload failed");
  }

  const user = await User.create({
    fullName,
    username,
    avatar: avatar.url,
    //coverImage:coverImage.url || "",
    email,
    password,
  });

  const createduser = await User.findById(user.id).select(
    "-password  -refreshToken"
  );

  if (!createduser) {
    throw new ApiError(500, "somethng went wrong");
  }
  
  return res.status(201).json(
    new ApiResponse(201,createduser,"User registered succusfulley")
  )

});

const loginUser = asynHandler(async (req, res) => {

  //body req (email || username|| password)
  // validation (user exist or not)
  //find user
  //password validation
  //refresh and access token
  //return tokens
  //susses message;

  const { username, email, password } = req.body;
       console.log(email)

  if (!username && !email) {
    throw new ApiError(400, "Username or email is Required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User is not found");
  }

  const isPasswordvalid = await user.passwordValidator(password);

  if (!isPasswordvalid) {
    throw new ApiError(400, "password is Incorrect");
  }
  const {accessToken,refreshToken}= await generateRefreshandAccessToken(user._id)

  User.findById(user._id).select("-password -refreshToken")

  const options={
    httpOnly :true,
    secure:true
  }
   return res.status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshtoken",refreshToken,options)
   .json(
    new ApiResponse(200,
    { 
      
      user:loginUser,accessToken,refreshToken
    },
      "user login Successfully")
   )



});


const logOutUser=asynHandler(async(req,res)=>{

await User.findOneAndUpdate(
  req.user._id,

  { $unset: { refreshToken :1 } },
   {
    new: true
   }
  
)

const options={
  httpOnly :true,
  secure:true
}

return res.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshtoken",options)
.json(
  new ApiResponse(200,{},"User logout ")
)
});

 const refreshAccessToken=asynHandler(async(req,res)=>{

 const incommingToken=  req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer", "");
 if(!incommingToken){
   throw new ApiError(401,"Unauthrorized Token")
 }
  
try {
   const decodedToken=jwt.verify(incommingToken,process.env.REFRESH_TOKEN_SECRET);
  
   const user=await User.findById(decodedToken?._id);
   if(!user){
    throw new ApiError(401,"Invalid Refresh Token")
   }
  
  const options ={
    httpOnly: true,
    secure: true,
  
  }
  
  const {newRefreshToken,accessToken}=await generateRefreshandAccessToken(user._id)
  
  req.status(201)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",newRefreshToken,options)
  .json(
   new ApiResponse(200,
    {accessToken,refreshAccessToken:newRefreshToken}
   )
  )
} catch (error) {
   throw new ApiError("401",error.message || "Inavalid refresh Token");
   
}

 })

export {
   registerUser,
   loginUser,
   logOutUser,
    refreshAccessToken
 };
