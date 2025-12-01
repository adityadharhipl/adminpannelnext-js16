import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const verifyToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("Generated verify token:", verifyToken);

        const newUser = new User({
            name,
            email,
            password: hashedPass,
            role: "user",
            isVerified: false,
            verifyToken: verifyToken,
        });

        const savedUser = await newUser.save();

        // await sendVerificationEmail(email, verifyToken);

        // console.log("Verification email sent to:", email);


        const token = jwt.sign(
            {
                userId: savedUser._id,
                email: savedUser.email,
                name: savedUser.name,
                role: savedUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            msg: "User created successfully",
            token,
            user: {
                userId: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            }
        });

    } catch (error) {
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
};





export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid password" });


        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
};






// // import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import User from "../models/User.js";

// // ===================== SIGNUP ===================== //
// export const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const exist = await User.findOne({ email });
//     if (exist) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     const hashedPass = await bcrypt.hash(password, 10);

//     // Generate email verification token
//     const verifyToken = jwt.sign(
//       { email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     console.log("Generated verify token:", verifyToken);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPass,
//       role: "user",
//     //   isVerified: false,
//       verifyToken: verifyToken,
//     });

//     const savedUser = await newUser.save();

//     // Send verification email
//     // await sendVerificationEmail(email, verifyToken);

//     // console.log("Verification email sent to:", email);

//     return res.status(201).json({savedUser,
//       msg: "User registered. Please verify your email.",
//     });

//   } catch (error) {
//     console.log("Signup error:", error);
//     return res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// // ===================== EMAIL SENDER ===================== //
// async function sendVerificationEmail(email, token) {
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

//   const link = `http://localhost:3000/api/auth/verify/${token}`;

//   console.log("Verification link:", link);

//   return transporter.sendMail({
//     from: process.env.EMAIL,
//     to: email,
//     subject: "Verify your email",
//     html: `
//       <h3>Email Verification</h3>
//       <p>Click the link below to verify your account:</p>
//       <a href="${link}">${link}</a>
//     `,
//   });
// }

// // ===================== LOGIN ===================== //
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//     // Block if email is not verified
//     if (!user.isVerified) {
//       return res.status(400).json({ msg: "Please verify your email first" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ msg: "Invalid password" });

//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//         name: user.name,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({
//       msg: "Login successful",
//       token,
//       user: {
//         userId: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });

//   } catch (error) {
//     console.log("Login error:", error);
//     return res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// // ===================== VERIFY EMAIL ===================== //
// export const verifyEmail = async (req, res) => {
//   const { token } = req.params;

//   console.log("Verify route hit with token:", token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded:", decoded);

//     const user = await User.findOne({ email: decoded.email });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid token" });
//     }

//     user.isVerified = true;
//     user.verifyToken = null;
//     await user.save();

//     console.log("User verified:", user.email);

//     return res.json({
//       msg: "Email verified successfully. You can now log in.",
//     });

//   } catch (error) {
//     console.log("Verify error:", error);
//     return res.status(400).json({ msg: "Invalid or expired token" });
//   }
// };
// // 