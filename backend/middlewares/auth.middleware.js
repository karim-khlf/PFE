import jwt from "jsonwebtoken";
import { loginService } from "../services/auth.services.js";
const authenticate = (req, res, next) => {
  let token = req.cookies?.token;

  // hdy bah ndir brk test f postman
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

const login = async (req, res) => {
  try {
    console.log("ani hna");
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
      return res.status(400).json("invalid request2");
    }
    console.log(req.body);

    const token = await loginService(req);
    console.log(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    res.json({
      message: "Logged in",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { authenticate, login };
