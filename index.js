import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import userRouter from "./routers/userRouter.js"
import galleryItemRouter from "./routers/galleryItemRouter.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import categoryRouter from "./routers/categoryRouter.js"
import roomRouter from "./routers/roomRouter.js"
import bookingRouter from "./routers/bookingRouter.js"
import cors from "cors"
import feedbackRouter from "./routers/feedbackRouter.js"
dotenv.config()

const app = express()

app.use(cors())

app.use(bodyParser.json())

const connectionString = process.env.MONGO_URL

app.use((req, res, next)=>{          //Authentication middleware
    const token = req.header("Authorization")?.replace("Bearer ","")
    if(token != null){
        jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
            if(decoded != null){
                req.body.user = decoded
                next()
            }else{
                next()
            }
        })
    }else{
        next()
    }
});

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to the Database")
    }
).catch(
    ()=>{
        console.log("Connection failed")
    }
)

app.use("/api/users", userRouter)
app.use("/api/gallery", galleryItemRouter)
app.use("/api/category", categoryRouter)
app.use("/api/room", roomRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/feedbacks", feedbackRouter)

app.listen(5000,(req,res)=>{
    console.log("Server is running on port 5000")
})