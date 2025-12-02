import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../config/sendEmail.js"; 

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // USE BASE_URL (Backend) NOT CLIENT_URL
    const link = `http://localhost:5001/api/auth/verify/${token}`;
    // const link = `${process.env.BASE_URL}/api/auth/verify/${token}`;

    await sendEmail(user.email, "Verify Email", `
      <h2>Verify your email</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${link}">${link}</a>
    `);

    res.json({ 
      msg: "Registered. Please check your email (Mailtrap) to verify.", 
      user: { id: user._id, name: user.name, email: user.email },
      // Sending token here for testing purposes if email fails
      token 
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    
    await User.findByIdAndUpdate(decoded.id, { verified: true });

    // CHANGED: Do NOT redirect to localhost:3000. 
    // Return HTML directly to the browser.
    res.status(200).send(`
      <html>
        <body style="text-align:center; padding: 50px; font-family: sans-serif;">
          <h1 style="color:green;">Email Verified Successfully!</h1>
          <p>You can close this window and login via Postman.</p>
        </body>
      </html>
    `);
    
  } catch (err) {
    res.status(400).send("Invalid or expired token");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    if (!user.verified) return res.status(403).json({ msg: "Verify email first" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "Email not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // USE BASE_URL (Backend)
    // NOTE: Because you have no Frontend, the user cannot 'Click' this to see a form.
    // They must Copy the TOKEN from this link to use in Postman.
    const link = `${process.env.BASE_URL}/api/auth/reset-password/${token}`;

    await sendEmail(email, "Reset Password", `
      <p>You requested a password reset.</p>
      <p><b>Since you are using Backend only:</b></p>
      <p>Copy the token from the link below and make a POST request to /api/auth/reset-password/{token}</p>
      <a href="${link}">${link}</a>
    `);

    res.json({ msg: "Reset link sent" });

  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // This expects a POST request with JSON body { "password": "newpassword" }
    const { password } = req.body;
    const { token } = req.params; // Grab token from URL parameter

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ msg: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
};