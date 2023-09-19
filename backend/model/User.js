import mongoose from "mongoose";

const User = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6, 
    },
    address : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true
    },
    blogs : [{
        type : mongoose.Types.ObjectId,
        ref : "blog",
        required : true
    }]
}) 
const user = mongoose.model('user',User)
export default user;