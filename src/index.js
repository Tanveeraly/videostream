import { app } from "./app.js"
import connectDB from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
 
  path:'./env'

}
  
)

connectDB()

.then(()=>{

  app.listen(process.env.PORT||8000,()=>
  {
      console.log(`the server is running at Port:${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log(err)
})




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