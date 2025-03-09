import DepartmentModel from "../Models/Departments.js"

const getDepartments =async(req , res)=>{

  try {
    const mydepartments = await DepartmentModel.find();

    if(!mydepartments){
      throw new Error ("department is not found");
    }

    res.json({
      message : "department found successfully",
      data : mydepartments,
      error : false, 
      sucess : true,
    })
    
  } catch (error) {
    res.json({
      mesage : error.message  || error,
      success : false,
      error : true,
    })
    
  }
}
export default getDepartments;