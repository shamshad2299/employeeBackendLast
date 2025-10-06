import DepartmentModel from "../Models/Departments.js";

const departmentController = async(req , res)=>{
  try {

    const {dep_name , description , department_head, location , contact_email} = req.body;
    if(!dep_name) throw new Error("Please enter department name");

    const findDep = await DepartmentModel.findOne({dep_name});
    if(findDep)  throw new Error("this department is already exist ");

    const newDepartment = new DepartmentModel({
      dep_name : dep_name,
      description : description,
      department_head,
      location,
      contact_email,
    });
    const department = await newDepartment.save();

    res.json({
      success : true,
      error : false,
      data : department,
      message : "Department added successfully"
    })


  } catch (error) {
    res.json({
      success : false , 
      error : true,
      message : error.message || error,
    })

  }

}

export default departmentController;