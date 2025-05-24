import jwt from "jsonwebtoken";
import { loginService } from "../services/auth.services.js";
import dotenv from 'dotenv'
dotenv.config({path:'./../.env'});
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await loginService(req);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    res.json({ message: "Logged in", user: { id: user.id, role: user.role },token:token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { authenticate, login };
