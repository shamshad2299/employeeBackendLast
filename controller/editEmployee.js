import Employee from "../Models/employeeModel.js";

const getEditEmployee = async(req , res)=>{


  try {
    const employeeId = req.params.id;
    const GetEditEmployee = await Employee.findById({_id : employeeId}).populate("userId",{password :0}).populate("department");
 
   res.json({
    employee : GetEditEmployee,
    message : "data",
    error : false,
    success : true,

   })

    
  } catch (error) {
 res.json({
  message : error.message || error,
  success : false,
  error: true,
 })

  }

}

export default getEditEmployee;