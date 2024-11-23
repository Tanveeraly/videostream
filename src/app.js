import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';

const app= express()

app.use(cors({
  origin:process.env.CORS_ORGIN,
  credentials:true

}))
app.use(express.json());
app.use(cookieParser()) ;






//routes
import userRouter from "./routes/user.routes.js"


//routes decleration

app.use("/api/v1/users",userRouter)

//controllers
import { registerUser } from "./controllers/user.controller.js"
import router from "./routes/user.routes.js"

export {app}