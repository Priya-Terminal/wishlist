import mongoose from "mongoose";

mongoose.models = {};

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  mobileNumber: Number, 
});

const User = mongoose.model("User", userSchema);

export default User;