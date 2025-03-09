import mongoose from 'mongoose';

const DataBaseConntect = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("data Base conncted successfully")
    
  } catch (error) {
    console.log("error with connction ti data base" ,error);
  }
}
export default DataBaseConntect;