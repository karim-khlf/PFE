import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config({path:'./../.env'});
console.log(process.env.SECRET_KEY)
export const loginService = async (req) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  return { token, user };
};

