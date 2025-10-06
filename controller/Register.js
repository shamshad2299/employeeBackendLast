import UserModel from "../Models/User.js";
 import bcrypt from "bcryptjs";

const Register = async(req , res)=>{

  try {
    const { name , email , password } = req.body;

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password , salt);
   

    if(!name) throw new Error("please Enter your name");
    if(!email) throw new Error("please Enter your email");
    if(!password) throw new Error("please Enter your password");
    

   const ExistingUser = await UserModel.findOne({email});

    if(ExistingUser) throw new Error("user already exist")
    
      const payload = {
        ...req.body , 
        password : hashedPassword,
      }
      const user  = new UserModel(payload);
      await user.save();

      res.status(200).json({
        data : user,
        message : " user created successfully"  ,
        success : true,
        error : false
      })


  } catch (error) {
 res.json({
  message : error.message || error,
  error : true,
  success : false,
 })

    
  }
}

 export default Register;
 
