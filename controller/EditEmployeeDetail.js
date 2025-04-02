import Employee from "../Models/employeeModel.js";

const EditEmployeeDetail = async (req, res) => {
  try {
    const empId = req?.params?.id;
    const {
      name,
      employeeId,
      dob,
      gender,
      maritalStatus,
      address,
      department,
      salary,
      role,
    } = req.body;

    const payload = {
      ...(name && { name: name }),
      ...(employeeId && { employeeId: employeeId }),
      ...(dob && { dob: dob }),
      ...(gender && { gender: gender }),
      ...(maritalStatus && { maritalStatus: maritalStatus }),
      ...(address && { address: address }),
      ...(department && { department: department }),
      ...(salary && { salary: salary }),
      ...(role && { role: role }),
 
    };

const newEmployee = await Employee.findByIdAndUpdate({_id : empId} , payload   ,{ new: true } // Returns the updated document
).populate("userId" , {password : 0}).populate("department");
res.status(200).json({
  message : "employee Updated Successfully",
  employee : newEmployee,
  error : false,
  success : true,
})

  } catch (error) {
    res.json({
      success : false,
      error : true,
      message : error.message || error
    })
  }
};

export default EditEmployeeDetail;
