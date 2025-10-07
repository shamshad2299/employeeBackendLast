import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    reqiured: true,
  },
  email: {
    type: String,
    reqiured: true,
    unique: true,
  },
  password: {
    type: String,
    reqiured: true,
  },
  role: {
    type: String,
    default: "GENERAL",
    enum: ["ADMIN", "EMPLOYEE", "GENERAL" , "MANAGER"],
  },
  profilePic: {
    type: String,
    default:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-sulimansallehi-1704488.jpg&fm=jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
  enum: ["pending", "active", "inactive", "suspended"],
    default: "active",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
