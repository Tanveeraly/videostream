import { asynHandler } from "../utlis/asynHandler.js";
import { ApiError } from "../utlis/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verfiyJWT = asynHandler(async ( req,res, next) => {
  console.log(req.cookies)
  try {
    const token = req.cookies?.accessToken;
    // req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(400, "TOKEN IS NOT AVALIABLE");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select('username email fullName avatar coverImage watchHistory');
    
    if (!user) {
      throw new ApiError(400, "Invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid AccessToken ");
  }
});
