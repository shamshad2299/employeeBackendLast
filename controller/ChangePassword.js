import UserModel from "../Models/User.js"
import bcrypt from "bcryptjs"


const ChangePassword = async(req , res) => {



  try {
    const {userId , oldPassword , newPassword } = req?.body;
    const user = await UserModel.findById({_id : userId});


    if(!user){
     throw new Error("user not found")
    }

    const isMatch = await bcrypt.compare(oldPassword , user.password);
    if(!isMatch){
      throw new Error("password is incorrect");
    }
    const hashedPassword = await bcrypt.hash(newPassword , 10);
    const newUser = await UserModel.findByIdAndUpdate({_id : userId} , {password : hashedPassword});


    res.status(202).json({
      success : true, 
      error : false,
      data : newUser,
    })
    
  } catch (error) {

    res.json({
      message : error.message || "internal server error",
      success : false,
      error : true,
    })
  
    
  }

}

export default ChangePassword