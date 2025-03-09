import Leave from "../Models/LeaveModel.js"


const ViewLeave =async (req ,res) => {

  try {
    const {id} = req?.params;
    const leave = await Leave.findById({_id : id}).populate({
      path : "employeeId",
      populate : [
        {
          path : "department",
          select : "dep_name"
        },
        {
          path : "userId",
          select : "name , profilePic",
        }
      ]
    });

    res.json({
      success : true,
      error : false,
      leaves : leave,
      message : "Leave Details are viewed"
    })
    
  } catch (error) {
    res.json({
      success : false,
      error : true,
      message : error.message || "internal server error"
    })
  }
 
}

export default ViewLeave