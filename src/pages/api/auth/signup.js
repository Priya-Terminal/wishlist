import bcrypt from "bcryptjs";
import { withIronSessionApiRoute } from "iron-session/next";
import { createGetIronSession, getIronSession } from "iron-session";

import { sessionOptions } from "@/lib/session";
import { getDatabase } from "@/models";
import User from "@/models/user";
import { cleanUser, saveUserToSession } from "@/utils/user";

const signUp = async (req, res) => {
  try {
    await getDatabase();

    const { email, password } = JSON.parse(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: "User already exists" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.])[A-Za-z\d@$!%*?&_.]{8,}$/;

    if (!password.match(passwordRegex)) {
      return res.status(400).json({
        error:
          "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, digit, and special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    
    await newUser.save();
    await saveUserToSession(req, newUser);
    res.status(201).json({ user: cleanUser(newUser) });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Failed to sign up" });
  }
};

export default withIronSessionApiRoute(signUp, sessionOptions);
