import mongoose, { Schema } from "mongoose"

const LeaveSchema = new mongoose.Schema({
  employeeId : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : "EmployeeModel",
   
  },
  leaveType : {
  type : String,
  enum : ["sick leave" , "casual leave" , "anual leave"],
  required: true,
  },

  startDate : {
    type : String,
   required : true,
  },
  endDate : {
    type : String,
   required : true,
  },
  description : {
    type : String,
   required : true,
  },
  status : {
    type : String,
    enum : ["pending" , "accepted" , "rejected"],
    default : "pending",

  },
  createdAt : {
    type :  Date,
    default : Date.now
  },
  updatedAt : {
    type :  Date,
    default : Date.now
  }

})

const Leave = mongoose.model("LeaveModel" , LeaveSchema);
export default Leave;