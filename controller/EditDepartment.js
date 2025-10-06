import DepartmentModel from "../Models/Departments.js";

// Get department data for editing
const EditDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Department ID is required",
        success: false
      });
    }

    const department = await DepartmentModel.findById(id);
    
    if (!department) {
      return res.status(404).json({
        error: true,
        message: "Department not found",
        success: false
      });
    }

    return res.status(200).json({
      department,
      success: true,
      error: false,
      message: "Department fetched successfully"
    });
    
  } catch (error) {
    console.error("Error fetching department:", error);
    return res.status(500).json({
      error: true,
      message: "Server error while fetching department",
      success: false
    });
  }
};

// Update department data
export const EditDataShow = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description, department_head, location, contact_email } = req.body;

    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Department ID is required",
        success: false
      });
    }

    // Validate required fields
    if (!dep_name || !description) {
      return res.status(400).json({
        error: true,
        message: "Department name and description are required",
        success: false
      });
    }

    // Validate email format if provided
    if (contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
      return res.status(400).json({
        error: true,
        message: "Invalid email format",
        success: false
      });
    }

    const payload = {
      dep_name,
      description,
      ...(department_head && { department_head }),
      ...(location && { location }),
      ...(contact_email && { contact_email }),
      updatedAt: new Date() // Track when the department was updated
    };

    const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
      id,
      payload,
      { new: true, runValidators: true } // Return updated doc and run schema validators
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        error: true,
        message: "Department not found",
        success: false
      });
    }

    return res.status(200).json({
      data: updatedDepartment,
      message: "Department updated successfully",
      error: false,
      success: true
    });

  } catch (error) {
    console.error("Error updating department:", error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: true,
        message: error.message,
        success: false
      });
    }
    
    return res.status(500).json({
      error: true,
      message: "Server error while updating department",
      success: false
    });
  }
};

export default EditDepartment;