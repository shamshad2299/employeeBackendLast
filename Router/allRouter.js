import express from "express"
import Register from "../controller/Register.js";
import Login from "../controller/Login.js";
//import verifyUser from "../middleWare/authMiddleware.js";
import authMiddleware from '../middleWare/authMiddleware.js'
import { verify } from "../controller/Login.js";
import departmentController from "../controller/departmentController.js";
import getDepartments from "../controller/GetDepartments.js";
import DeleteDepartment from "../controller/DeleteDepartment.js";
import  EditDepartment, { EditDataShow }  from "../controller/EditDepartment.js";
import addEmployee, { uploads } from "../controller/addEmployeeController.js";
import getEmployee from "../controller/getEmployee.js";
import getEditEmployee from "../controller/editEmployee.js";
import ViewEmployee from "../controller/ViewEmployee.js";
import EditEmployeeDetail from "../controller/EditEmployeeDetail.js";
import Salary from "../controller/salary.js";
import getEmployeeByDepId from "../controller/getEmployeeByDepId.js";
import getSalary from "../controller/getSalary.js";
import LeaveControler from "../controller/LeaveControler.js";
import getLeaves, { leaves } from "../controller/getLeaves.js";
import ChangePassword from "../controller/ChangePassword.js";
import ViewLeave from "../controller/ViewLeave.js";
import changeLeaveStatus from "../controller/changeLeaveStatus.js";
import Summary from "../controller/Dynamic-Dashboard/Summary.js";
//import getEmployeesByDepartmentId from "../controller/getEmployeeByDepId.js";
//import EditEmployee from "../../frontend/Employee-Management/src/components/Employee/EditEmployee.jsx";

const router = express.Router();

router.get("/auth" , (req, res)=>{
  res.status(200).json({success : true , data : "data send successfully" , message : "true"})
});


//Authentication API , login, signup,users
router.post("/register" , Register);
router.post("/login" , Login)
router.get("/verify-user" , authMiddleware , verify);

//router for department,add Department , update and delete department
router.post("/department" ,authMiddleware , departmentController );
router.get("/getdep" , authMiddleware , getDepartments)
router.get("/get-department/:id" , authMiddleware , EditDepartment);
router.post("/edit-department/:id" , authMiddleware , EditDataShow);
router.delete("/delete-dep/:id" , authMiddleware , DeleteDepartment);


//employee Informations, add ,edit ,get employees
router.post("/add-employee" , authMiddleware , uploads.single('image') , addEmployee)
router.get("/get-employee" , authMiddleware , getEmployee);
router.get("/edit-employee/:id",authMiddleware , getEditEmployee);
router.post("/finaledit-employee/:id",authMiddleware , EditEmployeeDetail);
router.get("/view-employee/:id",authMiddleware , ViewEmployee);
router.post("/employee/salary",authMiddleware , Salary);

router.get("/getemployeeby-depId/:id",authMiddleware ,getEmployeeByDepId);
router.get("/employee/salary/:id",authMiddleware ,getSalary);
router.post("/leave/applied",authMiddleware ,LeaveControler)
router.get("/getLeave/:id",authMiddleware ,getLeaves)

//change Password api
router.put("/setting",authMiddleware ,ChangePassword)
router.get("/leave",authMiddleware ,leaves)
router.get("/view-leave/:id",authMiddleware ,ViewLeave)
router.put("/change-status/:id",authMiddleware ,changeLeaveStatus);

//dynamic dashboard
router.get("/dashboard",authMiddleware , Summary);

export default router;