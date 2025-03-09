import Employee from "../Models/employeeModel.js";
import Leave from "../Models/LeaveModel.js";



async function  LeaveControler(req , res) {
 
  try {

    const { userId, startDate , leaveType , endDate , description } = req?.body
 
    if(!leaveType) throw new Error("please Ensure Type of Leave");
  const employee = await Employee.findOne({userId : userId});
  if(!employee){
    throw new Error("no such employee found");
  }
  const newLeave = new Leave({
     employeeId : employee._id ,
     leaveType,
     startDate,
     endDate,
     description
  });

  const leave = await newLeave.save();

  res.json({
    message : "Leave Applied Successfully",
    data : leave,
    error : false,
    success : true,
  })

    
  } catch (error) {
    res.json({
   message : error.message || "internal server error",
   success : false,
   error : true,
    })
  }

}

export default LeaveControler;