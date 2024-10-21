import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'



dotenv.config()
const app=express();
const PORT=process.env.port || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5001', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods allowed
    credentials: true // Enable credentials if using cookies, JWT, etc.
  }));
app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running at ${PORT}`)})