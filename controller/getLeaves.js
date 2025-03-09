import Employee from "../Models/employeeModel.js";
import Leave from "../Models/LeaveModel.js"


const getLeaves =async (req , res) => {
 try {
  const id = await req?.params?.id;
  
  let leaves;
  leaves = await Leave.find({employeeId : id});

  if(!leaves || leaves.length == 0){
    const employee = await Employee.findOne({userId : id});
    leaves = await Leave.find({employeeId : employee?._id}).populate("employeeId" ,"employeeId");
  }

res.json({
  data : leaves,
  success : true,
  error  : false,
})
  
 } catch (error) {
  res.json({
    message : error.message || "internal server error in gettin leaves",
    success : false,
    error : true,

  })
 }
}


export const leaves =async (req , res) => {
  try {

 const leave = await Leave.find().populate({
  path : "employeeId",
  populate : [
    {
      path : "department",
      select : "dep_name"
    },
    {
      path : "userId",
      select : "name"
    }
  ]
 })
 res.json({
   leaves : leave,
   success : true,
   error  : false,
 })
   
  } catch (error) {
   res.json({
     message : error.message || "internal server error in gettin leaves",
     success : false,
     error : true,
 
   })
  }
 }

export default getLeaves