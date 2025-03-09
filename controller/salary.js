import Employee from "../Models/employeeModel.js";
import salaryModel from "../Models/salaryModel.js"
import UserModel from "../Models/User.js";

const Salary = async(req , res)=>{
  try {
    const {  employeeId, salary ,allowance ,deduction, dueDate} = req?.body

    // if( !name || !salary || !allowance || !deduction || !dueDate){
    //   throw new Error("all fields are mandatory");
    // }

    const totalSalary = parseInt(salary)+ parseInt(allowance) -parseInt(deduction);
    // const EmployeeSalary = await Employee.findById({_id : employeeId});
    // if(EmployeeSalary){
    //   throw new Error("this employee already exist and salary added already")
    // }

    const emSalary = new salaryModel({

      employeeId,
      salary ,
      allowance,
      deduction,
      netSalary : totalSalary,
      dueDate,
    });

    const finalSalary = await emSalary.save();

    res.status(200).json({
      data : finalSalary,
      message : "salary added successfully",
      error : false,
      success : true,

    })
  } catch (error) {
    res.json({
      message : error.message || error,
      success : false,
      error : true,
    })
    console.log(error)
  }
}

export default Salary;