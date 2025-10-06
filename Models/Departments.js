import mongoose from "mongoose"
import Employee from "./employeeModel.js";
import Leave from "./LeaveModel.js";
import salaryModel from "./salaryModel.js";

const departmentSchema = new mongoose.Schema({
  // userId : {
  //   type  : mongoose.Schema.Types.ObjectId,
  //   ref : "User",
  // },
  dep_name : {
    type : String,
    required : true,
  },
  description: {
    type: String
  },
  createdAt : {
    type : Date,
    default : Date.now,
  },
  department_head : {
   type : String,
   required : true,

  },
  location : {
    type : String,
  },
  contact_email : {
      type : String,
  },
  updatedAt :{
    type : Date,
    default : Date.now,
  }
})


//cascade deleting using department

departmentSchema.pre("deleteOne" ,{document : true , query : false} , async function (next) {
  try {
    
    const employee = await Employee.find({department : this._id});
    const empId = employee.map(emp=>emp._id);
   await Employee.deleteMany({department : this._id});
   await Leave.deleteMany({employeeId : { $in : empId}})
   await salaryModel.deleteMany({employeeId : { $in : empId}})
   next();
  } catch (error) {
    next(error)
  }
  
})

const DepartmentModel = mongoose.model("Department" , departmentSchema);

export default DepartmentModel;