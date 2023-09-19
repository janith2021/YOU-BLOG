import mongoose from "mongoose";

const Blog = mongoose.Schema({
    topic : {
        type : String,
        required : true    
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true
    }

})

const blog = mongoose.model("blog",Blog)

export default blog;