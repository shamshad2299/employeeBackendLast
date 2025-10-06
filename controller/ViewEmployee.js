import Employee from "../Models/employeeModel.js";

const ViewEmployee = async (req, res) => {
 
  try {
    const id = req?.params?.id;

    let employee ;
    employee = await Employee?.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
      
      if(!employee){
        employee = await Employee?.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");

      }

    res.json({
      employee: employee,
      message: "Employee Viewed ",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export default ViewEmployee;
