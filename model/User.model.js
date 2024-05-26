import mongoose from "mongoose";

export const Userschema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "please provide unique username"],
        unique : [true, "username exist"]
    },
    Password : {
        type : String,
        required : [true, "please provide a password"],
        unique : false,
    },
    email : {
        type : String, 
        required : [true,"please provide email"],
        unique : true,
    },
    firstName : {type : String},
    lastName : {type : String},
    mobile : {type : Number},
    address : {type : String},
    profile : {type : String},
})

export default mongoose.Model.Users || mongoose.model('User', Userschema);