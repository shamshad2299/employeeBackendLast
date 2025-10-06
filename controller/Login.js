
import UserModel from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Login = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    if(!email || !password) throw new Error("please enter your email and password")

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

     const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Password does not match");
    }

    const payload = {
      id: user._id,
      role: user.role,
    };
 
    
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || "shamshad7986654dfs", {
      expiresIn: "10d",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email : user.email,
        name: user.name,
        role: user.role,
      },
      error: false,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
    
  }
};

export const verify = (req , res)=>{
  res.status(200).json({
    success : true ,
    user : req?.user,
  });
}

export default Login;

