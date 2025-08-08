import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/usersRoute.js'
import mongoose from 'mongoose'
import galleryItemRouter from './routes/galleryItemRouter.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import categoryRouter from './routes//categoryRouter.js'
import roomRouter from './routes/roomRouter.js'
import bookingRouter from './routes/bookingRouter.js'
import cors from 'cors'
dotenv.config()
 


const app = express()

app.use(cors())

app.use(bodyParser.json())

const connectionString = process.env.MONGO_URL;

app.use((req,res,next)=>{

  const token = req.header("Authorization")?.replace("Bearer ", "")

  if(token != null){
    jwt.verify(token,process.env.JWT_KEY,
      (err,decoded)=>{
      if(decoded != null){
        req.body.user = decoded
        next()
      }else{
        next()
      }
    }
  )
  }else{
    next()
  }
});

mongoose.connect(connectionString).then(
  ()=>{
    console.log("Connected to the database")
  }
).catch(
  ()=>{
    console.log("Connection failed")
  }
)

app.use("/api/users",userRouter)
app.use("/api/gallery",galleryItemRouter)
app.use("/api/category",categoryRouter)
app.use("/api/room",roomRouter)
app.use("/api/booking",bookingRouter)
app.listen(5000,(req,res)=>{
  console.log("Sever is running on on port 5000")
});