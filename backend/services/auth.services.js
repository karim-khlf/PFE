import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const loginService = async (req) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ where: { email } }); // Sequelize example
  if (!user) throw new Error("User not found");

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
  return token;
};
