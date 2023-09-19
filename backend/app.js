import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userroutes from './routes/userroutes'
import blogrouter from './routes/blogroutes'
import cors from 'cors'
import multer from 'multer'
import fileUpload from 'express-fileupload'
import session from 'express-session'


dotenv.config()
const app = express()
app.use(cors())
app.use(session({
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true
}))
app.use(express.json())
app.use(fileUpload({
    createParentPath : true
}))



app.use("/api/user",userroutes)
app.use("/api/blogs",blogrouter)

const port = 5000;

mongoose.connect(process.env.MONGODB_URL).then(()=> app.listen(port)).then(()=> console.log("Database Connected and You can Listen To the Database at Port Number "+port)).catch((error)=>console.log(error))
