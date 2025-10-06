
import express from "express";
import Register from "../controller/Register.js";
import Login, { verify } from "../controller/Login.js";
import authMiddleware from "../middleWare/authMiddleware.js";
import departmentController from "../controller/departmentController.js";
import getDepartments from "../controller/GetDepartments.js";
import DeleteDepartment from "../controller/DeleteDepartment.js";
import EditDepartment, { EditDataShow } from "../controller/EditDepartment.js";
import {
  addEmployee,
  uploads,
  getPendingEmployeeRequests,
  updateEmployeeRequestStatus,
} from "../controller/addEmployeeController.js";
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

const router = express.Router();

// Test route
router.get("/auth", (req, res) => {
  res
    .status(200)
    .json({ success: true, data: "data send successfully", message: "true" });
});

// ---------------- Authentication ----------------
router.post("/register", Register);
router.post("/login", Login);
router.get("/verify-user", authMiddleware, verify);

// ---------------- Department Routes ----------------
router.post("/department", authMiddleware, departmentController);
router.get("/getdep", authMiddleware, getDepartments);
router.get("/get-department/:id", authMiddleware, EditDepartment);
router.put("/edit-department/:id", authMiddleware, EditDataShow);
router.delete("/delete-dep/:id", authMiddleware, DeleteDepartment);

// ---------------- Employee Routes ----------------
router.post("/add-employee", authMiddleware, uploads.single("profilePic"), addEmployee);
router.get("/get-employee", authMiddleware, getEmployee);
router.get("/edit-employee/:id", authMiddleware, getEditEmployee);
router.post("/finaledit-employee/:id", authMiddleware, EditEmployeeDetail);
router.get("/view-employee/:id", authMiddleware, ViewEmployee);
router.post("/employee/salary", authMiddleware, Salary);
router.get("/getemployeeby-depId/:id", authMiddleware, getEmployeeByDepId);
router.get("/employee/salary/:id", authMiddleware, getSalary);

// ---------------- Leave Management ----------------
router.post("/leave/applied", authMiddleware, LeaveControler);
router.get("/getLeave/:id", authMiddleware, getLeaves);
router.get("/leave", authMiddleware, leaves);
router.get("/view-leave/:id", authMiddleware, ViewLeave);
router.put("/change-status/:id", authMiddleware, changeLeaveStatus);

// ---------------- Settings ----------------
router.put("/setting", authMiddleware, ChangePassword);

// ---------------- Dashboard ----------------
router.get("/dashboard", authMiddleware, Summary);

// ---------------- Admin Only ----------------
router.get("/pending-requests", authMiddleware, getPendingEmployeeRequests);
router.put("/:employeeId/status", authMiddleware, updateEmployeeRequestStatus);

export default router;

