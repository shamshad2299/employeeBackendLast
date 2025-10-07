import { Error } from "mongoose";
import UserModel from "../Models/User.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import Employee from "../Models/employeeModel.js";
import { isValidEmail } from "../utils/validators.js";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for image uploads
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer with limits and file filter
export const uploads = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter
});


export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      address,
      department,
      salary,
      role,
      password,
      status, // Add status field from frontend
      requestedBy // Add requestedBy from frontend
    } = req.body;

    const currentUser = req.user;
    const isAdmin = currentUser?.role === "ADMIN";

    // ✅ Basic validations - ADMIN aur COMMON USER ke liye alag validation
    if (!name || !dob || !gender || !department || !role) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Name, date of birth, gender, department and role are required fields",
      });
    }

    // ADMIN ke liye additional validations
    if (isAdmin) {
      if (!email || !employeeId || !password) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Email, employee ID, and password are required for admin",
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Please provide a valid email address",
        });
      }

      if (password && password.length < 6) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Password must be at least 6 characters long",
        });
      }
    }

    // ✅ Check if employee ID already exists (only for admin)
    if (isAdmin && employeeId) {
      const existingEmployee = await Employee.findOne({ employeeId });
      if (existingEmployee) {
        return res.status(409).json({
          success: false,
          error: true,
          message: "Employee ID already registered",
        });
      }
    }

    // ✅ Check if email already exists (only for admin)
    if (isAdmin && email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: true,
          message: "Email already registered",
        });
      }
    }

    // ✅ COMMON USER FLOW (Employee Request)
    if (!isAdmin) {
      // Common user ke liye employee request create karein
      const newEmployee = new Employee({
        name,
        email: email || `${name.replace(/\s+/g, '.').toLowerCase()}@requested.com`, // Temporary email
        employeeId: `REQ-${Date.now()}`, // Generate temporary employee ID
        dob,
        gender,
        maritalStatus,
        address,
        department,
        salary: 0,
        role: role || "EMPLOYEE",
        status: "pending",
        userId : currentUser?._id,
        requestedBy: currentUser?._id,
        requestDate: new Date(),
      });

      const savedEmployee = await newEmployee.save();

      return res.status(201).json({
        message: "Employee request submitted successfully. Waiting for admin approval.",
        data: savedEmployee,
        error: false,
        success: true,
      });
    }

    // ✅ ADMIN FLOW (Direct Employee Creation)
    if (isAdmin) {
      // Create user account
      const hashPassword = await bcrypt.hash(password, 12);

      const newUser = new UserModel({
        name,
        email,
        password: hashPassword,
        role: role || "EMPLOYEE",
        status: "active",
        profilePic: req.file
          ? req.file.filename
          : "https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e1377d4/_orig/pixomatic_1572877223091.png",
        createdBy: currentUser?._id,
        createdAt: new Date(),
      });

      const savedUser = await newUser.save();

      // Create employee record
      const newEmployee = new Employee({
        userId: savedUser._id,
        name,
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        address,
        department,
        salary: salary || 0,
        status: "active",
        approvedBy: currentUser?._id,
        approvalDate: new Date(),
      });

      const savedEmployee = await newEmployee.save();

      const responseData = {
        ...savedEmployee.toObject(),
        userId: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          role: savedUser.role,
          status: savedUser.status,
          profilePic: savedUser.profilePic,
        },
      };

      return res.status(201).json({
        message: "Employee added successfully",
        data: responseData,
        error: false,
        success: true,
      });
    }

  } catch (error) {
    console.error("Error adding employee:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: true,
        message: "Validation failed",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

// Additional controller to get pending employee requests (for admin)
export const getPendingEmployeeRequests = async (req, res) => {
  try {
    const pendingEmployees = await Employee.find({ status: 'pending' })
      .populate('userId', 'name email profilePic')
      .populate('requestedBy').
      populate('department')
      .sort({ requestDate: -1 });

    return res.status(200).json({
      success: true,
      error: false,
      message: "Pending employee requests retrieved successfully",
      data: pendingEmployees,
      count: pendingEmployees.length
    });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Failed to fetch pending employee requests"
    });
  }
};

// Controller to approve/reject employee requests (for admin)
export const updateEmployeeRequestStatus = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const { status, salary, role } = req.body; // status: 'active' or 'rejected'
    const currentUser = req.user;

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Only admins can approve employee requests"
      });
    }


const employee = await Employee.findOne({ employeeId: employeeId.trim() }).populate('userId');

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Employee request not found"
      });
    }

    if (employee.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Employee request is not in pending status"
      });
    }

    // Update employee status
    employee.status = status;
    employee.approvedBy = currentUser._id;
    employee.approvalDate = new Date();
    
    if (status === 'active' && salary) {
      employee.salary = salary;
    }

    await employee.save();

    // Update user status and role if approved
    if (status === 'active') {
      await UserModel.findByIdAndUpdate(employee.userId._id, {
        status: 'active',
        role: role || 'EMPLOYEE'
      });
    }

    const updatedEmployee = await Employee.findOne({ employeeId })
      .populate('userId', 'name email profilePic role status')
      .populate('requestedBy', 'name email')
      .populate('approvedBy', 'name email');

    return res.status(200).json({
      success: true,
      error: false,
      message: `Employee request ${status} successfully`,
      data: updatedEmployee
    });

  } catch (error) {
    console.error("Error updating employee request:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Failed to update employee request status"
    });
  }
};

