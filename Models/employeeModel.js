import mongoose, { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employeeId: {
    type: String,
    unique: true,
    required: true,
   // match: /^[a-zA-Z0-9]+$/, // Example validation for alphanumeric characters
  },
  dob: {
    type: Date,
    min: new Date("1900-01-01"), // Example validation for minimum date
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Example enum validation
  },
  maritalStatus: {
    type: String,
    //enum: ["Single", "Married", "Divorced", "Widowed"], // Example enum validation
  },
   status: {
    type: String,
  enum: ["pending", "active", "inactive", "suspended"],
    default: "active",
  },
  address: {
    type: String,
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  salary: {
    type: Number,
    required: true,
    min: 0, // Example validation for minimum salary
  },

    requestedBy: {
    type:Schema.Types.ObjectId,
    ref: "User",
  },
  approvedBy: {
    type:Schema.Types.ObjectId,
    ref: "User",
  },
  requestDate: {
    type: Date,
  },
  approvalDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("EmployeeModel", employeeSchema);
export default Employee;
