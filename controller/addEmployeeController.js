import { Error } from "mongoose";
import UserModel from "../Models/User.js";
import bcrypt from "bcryptjs";
import multer from "multer"
import path from "path";
import Employee from "../Models/employeeModel.js";


const storage = multer.diskStorage({
  destination : (req , file , cb)=> {
    cb(null , "public/uploads")
  },
  filename : (req ,file , cb)=>{
    cb(null ,Date.now() + path.extname(file.originalname))
  }
})

export const uploads  = multer({storage : storage})

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../public/uploads');
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// export const uploads = multer({ storage: storage });


const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      address,
      department,
      salary,
      role,
      password,
    } = req.body;

   // Input validation
    if (!name || !email || !employeeId || !password) {
      throw new Error("Please provide all required fields");
    }
    if(!email){
      throw new Error("please provide Email")
    }
    if(!department){
      throw new Error("please provide a department")
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already registered as employee");
    }
    const existingUser2 = await UserModel.findOne({ employeeId });
    if (existingUser2) {
      throw new Error("this Employee Id already registered");
    }

    // Create new user
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      password: hashPassword,
      email,
      role,
      profilePic: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();


    // Create new employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      address,
      department,
      salary,
    });
    const newEm = await newEmployee.save();

    // Return response
    res.status(200).json({
      message: "Employee added successfully",
      data: newEm,
      error: false,
      success: true,
    });
  } catch (error) {

    res.json({
      success: false,
      error: true,
      message: error.message || error,
  });
  
}
};


export default  addEmployee;