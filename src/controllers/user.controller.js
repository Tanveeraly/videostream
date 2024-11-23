import { asynHandler } from "../utlis/asynHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utlis/apiError.js";
import { uploadOncloudinary } from "../utlis/cloudinary.js";

const registerUser = asynHandler(async (req, res) => {
  /* USER DATA FROM BACKEND
 2: VALIDATION
 3: CHECK IF THE USER IS ALREADY EXIST IN DATABASE
 3:CHECK FOR IMAGES ,CHECK FOR AVATAR 
 4: sUPLOAD THEM TO CLOUDINARY,AVATAR
 5:CREATE USER OBJECT -CREATE ENTRY IN DATABASE MONGO DB
6:REMOVE PASSWORD AND REFRESH TOKEN FROM RESPONSE
7:CHECK FOR USER CREATION 
8:RETURN REPONSE
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
  if (createduser) {
    throw new ApiResponse(201, "The user is createsd");
  }
  if (!createduser) {
    throw new ApiError(500, "somethng went wrong");
  }
});

const loginUser = asynHandler(async (req, res) => {
  //body req (email || username|| password)
  // validation (user exist or not)
  //find user
  //password validation
  //refresh and access token
  //return tokens
  //susses message;

  const { username, email, password } = body.req;

  if (!username || !email) {
    throw new ApiError(400, "Username or Password is Required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User is not found");
  }

  const isPasswordvalid = User.passwordValidator(password);

  if (!isPasswordvalid) {
    throw new ApiError(400, "password is Incorrect");
  }
});

export { registerUser };
