
import connectDB from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
 
  path:'./env'

}
  
)

connectDB()



/*

import express from "express";
const app =express()


( async()=>{

    try {
        
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log("Connected to MongoDB")
      app.on("error", (error)=>{
        console.log("server is not running")

      })
      app.listen(process.env.PORT,()=>{

        console.log(`app is connect on port ${process.env.PORT}`)
      })
    } catch (error) {
        
        console.error(error);
        throw err
    }

}

)()*/