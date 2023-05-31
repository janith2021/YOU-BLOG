import express from 'express'
import { createblog, deleteblog, getAllblogs, getuserposts, myblog, updateblog } from '../controllers/blogcontroller'


const blogrouter = express()


blogrouter.get("/",getAllblogs)
blogrouter.post("/",createblog)
blogrouter.patch("/update/:id",updateblog)
blogrouter.delete("/delete/:id",deleteblog)
blogrouter.get("/user/:id",getuserposts)
blogrouter.post("/:id",myblog)


export default blogrouter;