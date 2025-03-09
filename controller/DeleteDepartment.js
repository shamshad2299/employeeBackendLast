import DepartmentModel from "../Models/Departments.js"

const DeleteDepartment = async(req , res)=>{


  try {
    const id = req?.params?.id;
    
  const newDep = await DepartmentModel.findByIdAndDelete({_id : id});
  await newDep.deleteOne();
 
 res.json({
  success : true,
  error : false,
  data : newDep,
  message : "deleted Successfully",
 })


    
  } catch (error) {
res.json({
  error : true,
  success : false,
  message : error.message || "internal server error",
})
  }
}
 export default DeleteDepartment;