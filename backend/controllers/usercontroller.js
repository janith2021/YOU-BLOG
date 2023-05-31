import User from "../model/User";
import bcrypt from "bcryptjs";
import session from "express-session";

let OTP;

export const getAllUser = async(req,res,next) => {
    let users;
    try {
        users = await User.find()
    } catch (error) {
        console.log(error)
    }

    if(!users){
        return res.status(404).json({message : 'No Users Found'})
    }
    return res.status(200).json({users})
}

export const registerUser = async(req,res,next) => {
    const existinguser = await User.findOne({'email' : req.body.email})
    if(existinguser){
       return res.json({message :'Email Already Exists' , type : 'error'});
    }
    req.body.password  = bcrypt.hashSync(req.body.password)
    const users =  new User(req.body)
    try {
        await users.save()
    } catch (error) {
        console.log(error)
    }
    return res.json({message : 'User Registered Successfully' , type : 'success'})
}

export const login = async (req,res) => {
    try {
        const users = await User.findOne({'email' : req.body.email})
        if(!users){
            res.json({message : "Invalid Email" , type : 'error'})
        }else{
            try {
                const verifypassword = bcrypt.compareSync(req.body.password,users.password)
                if(!verifypassword){
                    res.json({message: "Invalid Password" , type : 'error'})
                }else{
                    res.json({users})
                }
            } catch (error) {
                res.status(404).json({message : error})
            }
        }
    } catch (error) {
        res.status(404).json({message : error})
    }
   

}

export const reset =  async (req,res,next) => {
    const userexists = await User.findOne({'email' : req.body.email})
    if(userexists){
        const mobile = userexists.phone
        const user = userexists.name
        const id = userexists._id
         OTP = Math.floor(Math.random() * 10000)
        // console.log(userexists.phone)
        res.json({message: 'User Exists' , otp : OTP , type :'success' , phone : mobile , name : user , id: id})
    }
    else{
        res.json({message : 'Invalid Email', type: 'error'})
    }

}

export const verify = async (req,res,next) => {
    const otp = Number(req.body.OTP)
    console.log(otp)
    console.log(OTP)
    if(otp === OTP){
        res.json({message : 'OTP VERIFIED' , type:'success'})
    }
    else{
        res.json({message : 'INVALID OTP' , type: 'error'})
    }
}

export const resetpassword = async (req,res,next) => {
    const _id = req.body.user
    const password = bcrypt.hashSync(req.body.password)
    const user = await User.findByIdAndUpdate(_id,{'password' : password},{
        new : true
    })
    res.json({message : 'User Password Updated Successfully', type: 'success', user : user})
    
}