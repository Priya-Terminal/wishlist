import { withIronSession } from "iron-session";
import User from "@/models/user";
console.log("Imported withIronSession successfully");

export default withIronSession(
  async (req, res) => {
    try {
      console.log("API request received: updateUser");
      const { user } = req.session;
      const { name, email } = req.body;

      console.log("User session data:", user);
      console.log("Request body data:", req.body);

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { name, email }, // Use object shorthand to simplify the update
        { new: true } // Return the updated document
      );

      console.log("Updated user data:", updatedUser);

      // Update the user session data with the new information
      req.session.user = updatedUser;
      console.log("User data updated successfully");

      res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
      console.error("Mongoose error:", error);
      res.status(500).json({ error: "Failed to update user data" });
    }
  },
  {
    password: "yPo4T7apfbdvctV1Bso1oAndQH9qwC94",
    cookieName: "user-session",
  }
);



