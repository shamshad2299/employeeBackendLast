import jwt from "jsonwebtoken"
import UserModel from "../Models/User.js";

const verifyUser  = async(req ,res ,next)=>{
  try {
    
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) throw new Error("Please Login");
    //console.log(token)

    const decoded = jwt.verify(token ,process.env.JWT_SECRET_KEY);
    if(!decoded) throw new Error("invalid Token");
    //console.log(decoded)

     const user = await UserModel.findById({_id : decoded.id}).select("-password");
     if(!user) throw new Error("User not Found ");


    req.user = user;
    // res.status(200).json({
    // message : "user Verified successfully ",
    // error : false,
    //  success : true,
    // })

    next();

  } catch (error) {
    res.json({
      error : true,
      message : error.message || error,
      success : false,
    })

  }
}
export default verifyUser;