 import DepartmentModel from "../../Models/Departments.js";
import Employee from "../../Models/employeeModel.js";
import Leave from "../../Models/LeaveModel.js";

const Summary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await DepartmentModel.countDocuments();
    const totalSalaries = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$salary" },
        },
      },
    ]);

    const leaveApplied = await Leave.distinct("employeeId");
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const leaveSummary = {
      appliedFor: leaveApplied.length,
      approved: leaveStatus.find((item) => item._id === "accepted")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "pending")?.count || 0,
    };

    return res.json({
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      leaveSummary,
      message: "All data fetched successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

export default Summary;
