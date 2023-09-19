import mongoose from "mongoose";
import blog from "../model/blog";
import User from "../model/User";
import path from 'path';
import { v4 } from "uuid";
import { ObjectId } from "mongoose";
import user from "../model/User";




export const getAllblogs = async (req,res,next) =>{
    const blogs = await blog.find().populate('user')
    if(blogs.length === 0){
        res.json({message : "No Blogs Available at this Moment. Be the First Blogger At YOU BLOG"})
    }else{
        res.json({blogs})
    }
} 

const __dirname = path.dirname(new URL(import.meta.url).pathname)

export const createblog = async (req,res,next) => {
    
     const {topic ,description,user} = req.body
   
    try {
        const existuser = await User.findById(user)
        console.log(user)
    
    if(existuser){
                const imgfile = req.files && req.files.image
                const filename = req.files.image.name
                const imgname = 'YOUBLOG_'+user+'_'+Date.now()+'_'+v4()+'_'+filename
                if(!imgfile){
                    return res.json({message : 'Please Upload Your Post Image' , type : 'error'})
                }
                
                imgfile.mv(`H:/MIHA INSTITUTE/Blog App/frontend/public/uploads/${imgname}`,(err)=>{
                    console.log(err)
                })
                    
                
                const Blog = new blog({
                    topic,
                    description,
                    image : `./uploads/${imgname}`,
                    user
                })
                console.log(Blog.image)
                const session = await mongoose.startSession();
                session.startTransaction()
                const newblog = await Blog.save({session})
                await existuser.blogs.push(Blog)
                await existuser.save({session})
                await session.commitTransaction();
                res.json({message : 'Your Post Added Successfully' , type : 'success'})
       
    }else{
        res.status(404).json({message : "No User Found"})
    }
    } catch (error) {
        res.status(404).json({message : error})
    }
    
}

export const updateblog = async (req,res,next) => {
    console.log(req.body)
    const{topic,description , user} = req.body
    // const user = req.body.user
    const _id = req.params.id
    console.log(_id)
    const fileimage = req.files && req.files.image
    const filename = fileimage.name
    const imgname = 'UPDATED'+'_'+'YOUBLOG'+'_'+user+'_'+Date.now()+'_'+v4()+'_'+filename 
    //  console.log(imgname)
    fileimage.mv(`H:/MIHA INSTITUTE/Blog App/frontend/public/uploads/${imgname}`)
    try {
        const Blog = await blog.findByIdAndUpdate(_id,{topic,description,user, image : `./uploads/${imgname}` },{
            new : true
        })
        res.json({Blog})
    } catch (error) {
        res.status(404).json({message : error})
    }
      
}

export const myblog = async(req,res,next) => {
    const _id = req.params.id
    const users = req.body.users
    
    try {
        const Blog = await blog.findById(_id)
        
        if(Blog){
            
             const user = Blog.user
             const bloguser = user.valueOf()
                        
            if(bloguser === users){
                res.json(Blog)
            }else{
                res.json({message : 'You Are Not The Owner of This Blog' , type : 'warning'})
            }
        }
    } catch (error) {
        res.json({error})
    }
}

export const deleteblog = async (req,res,next) => {
    const _id = req.params.id
    console.log(_id)
    try {
        const Blog = await blog.findById(_id)
        console.log(Blog)
        if(Blog){
            const bloguser = await User.findById(Blog.user)
            if(bloguser){
                const deleteblog = await blog.findByIdAndRemove(_id).populate("user");
                const check = await deleteblog.user.blogs.pull(deleteblog)
                await deleteblog.user.save()
                res.json({message : "Blog deleted successfully"})
            } 
        }
    } catch (error) {
        res.status(404).json({message : error})
    }
}

export const getuserposts = async (req,res,next) =>{
    const _id = req.params.id;
    console.log(_id)
    let userblogs;
   
    try {
         userblogs = await User.findById(_id).populate("blogs")
         if(userblogs.blogs.length === 0){
            return res.json({message : "No Blogs Found"})
        }
        return res.status(200).json({blogs:userblogs.blogs , user:userblogs.email})
    } catch (error) {
        res.status(404).json({message : error})
    }
}