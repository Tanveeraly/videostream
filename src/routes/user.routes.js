import { Router } from "express";
import { registerUser,loginUser,logOutUser,refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),

  registerUser

);

router.route("/login").post(loginUser)
router.route("/logout").post(verfiyJWT,logOutUser)
router.route("/refreshToken").post(refreshAccessToken)
export default router;
