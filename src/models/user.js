import mongoose from "mongoose";

mongoose.models = {};

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String, 
});

const User = mongoose.model("User", userSchema);

export default User;