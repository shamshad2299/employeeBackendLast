// import Employee from "../Models/employeeModel.js";
// import salaryModel from "../Models/salaryModel.js";

// const getSalary = async(req , res)=>{

//   try {
//     const id  = req.params.id;
//     let salary;
//      salary  = await salaryModel.find({employeeId : id}).populate("employeeId");

//     if(!salary || salary.length < 1){
//       const employee = await Employee.findOne({userId : id});
//       console.log(employee);
//       salary = await salary.find({employeeId : employee?._id}).populate("employeeId");
//     }
//    res.status(200).json({
//     salary : salary,
//     message : "fetched successfuly",
//     error : false,
//     success : true,

//    })
    
//   } catch (error) {
//  res.json({
//   error : true,
//   success : false,
//   message : error.message || "internal server error",
//  })
//   }

// }

// export default getSalary;
import Employee from "../Models/employeeModel.js";
import salaryModel from "../Models/salaryModel.js";

const getSalary = async (req, res) => {
  try {
    const id = req.params.id;
    let salary;

    // First, try to find salary by employeeId (which is the userId)
    salary = await salaryModel.find({ employeeId: id }).populate("employeeId");

    // If no salary is found, try to find salary by employee's _id
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      
      if (employee) {
        salary = await salaryModel.find({ employeeId: employee._id }).populate("employeeId");
      }
    }

    res.status(200).json({
      salary: salary,
      message: "Fetched successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export default getSalary;
