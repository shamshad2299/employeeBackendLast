import Employee from "../Models/employeeModel.js";


const getEmployeeByDepId = async(req ,res) => {

  try {

    const id = req.params.id;
    const getEmployees = await Employee.find({department : id});
    res.status(200).json({
      data : getEmployees,
      success : true,
      error : false
    })
    
  } catch (error) {
 res.json({
     message : error.message|| "internal server error",
    success : true,
    error : false
 })
  }
 
}

export default getEmployeeByDepId