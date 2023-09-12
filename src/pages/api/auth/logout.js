import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

const logoutRouter = async (req, res) => {
  try {
    console.log("Logging out user");
    await req.session.destroy(); 
    console.log("User logged out successfully");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "Failed to log out" });
  }
};

export default withIronSessionApiRoute(logoutRouter, sessionOptions);
