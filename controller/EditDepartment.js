import DepartmentModel from "../Models/Departments.js";

const EditDepartment = async(req , res)=>{

  try {

    const id = req?.params?.id;
    const newDepartment = await DepartmentModel.findById({_id : id })
    
  res.json({
    department : newDepartment,
    success : true,
    error : false,
    message : "Department updated successfully"
  })
    
  } catch (error) {

    res.json({
      error : true,
      message : error.message || error,
      success : false,
    })
    
  }

}

export const EditDataShow = async (req ,res)=>{

  try {
    const id = req?.params?.id;

    const {dep_name , description} = req.body;

    const payload = {
      ...(dep_name && {dep_name : dep_name}),
      ...(description && {description :description})
    }
    
const newData  = await DepartmentModel.findByIdAndUpdate({_id : id} , payload);

res.json({
  data : newData,
  message : "Department updated successfully",
  error : false,
  success : true,
})

  } catch (error) {
    res.json({
    
      message : error.message || error,
      error : true,
      success : false,
    })
    
    
  }
  
}

export default EditDepartment;