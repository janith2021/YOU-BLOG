import express from 'express';
import { getAllUser, login, registerUser , reset, resetpassword, verify } from '../controllers/usercontroller';
const userroutes = express.Router()


userroutes.get("/",getAllUser)
userroutes.post("/",registerUser)
userroutes.post("/login",login)
userroutes.post("/reset",reset)
userroutes.post("/verify",verify)
userroutes.post("/resetpassword",resetpassword)

// nodemon --experimental-modules --es-module-specifier-resolution=node app.js

export default userroutes;