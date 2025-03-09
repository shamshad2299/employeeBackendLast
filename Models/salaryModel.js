import mongoose, { Schema } from "mongoose";

const SalarySchema = new mongoose.Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "EmployeeModel",
    required: true,
  },
  salary: {
    type: Number,
  },
  netSalary: { type: Number },
  deduction: { type: Number },
  allowance: { type: Number },
  dueDate: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const salaryModel = mongoose.model("salaryModel", SalarySchema);
export default salaryModel;
