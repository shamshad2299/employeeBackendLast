import Employee from "../Models/employeeModel.js";
const getEmployee = async(req , res)=>{

try {

  const employees  = await Employee.find().populate("userId",{password :0}).populate("department");
 
res.status(200).json({
  error : false,
  success: true,
  employees,
  message : "fetched data"
})
  
} catch (error) {
  res.json({
    error : true,
    success: false,
    message : error.message || error
  })
}

}
export default getEmployee;