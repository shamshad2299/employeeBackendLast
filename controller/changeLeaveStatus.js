import Leave from "../Models/LeaveModel.js";


const changeLeaveStatus = async(req ,res) => {

  try {
    const {id} = req.params;
    const {status} = req.body;
    const Status = await Leave.findByIdAndUpdate({_id : id} ,{status});
   
    res.json({
      success : true,
      error : false,
      status : Status,
      message : "status updated"
    })
    
  } catch (error) {
    res.json({
      success : false,
      error : true,
      message : error.message || "internal server error"
    })
  }
 
}

export default changeLeaveStatus