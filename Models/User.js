import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name : {
    type : String,
    reqiured : true,
  },
  email : {
    type : String,
    reqiured : true,
    unique : true,
  },
  password : {
    type : String,
    reqiured : true,
  },
  role : {
    type : String 
  },
  profilePic : {
    type : String
  },
  createdAt : {
  type : Date,
  default : Date.now
  },
  updatedAt : {
    type : Date,
    default : Date.now
    }

},)

const UserModel = mongoose.model("User" , UserSchema);
export default UserModel;