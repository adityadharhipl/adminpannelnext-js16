// export const myProfile = (req, res) => {
//   res.json(req.user);
// };

// export const getAllUsers = async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json(users);
// };

// export const adminSecretLogin = async (req, res) => {
//   const { userId } = req.params;

//   const user = await User.findById(userId);
//   if (!user) return res.status(404).json({ msg: "User not found" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//   res.json({ msg: "Admin logged in as user", token, user });
// };



import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const myProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        return res.json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// 2. Get All Users (Admin Only) + Total Count
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const totalUsers = await User.countDocuments();

    res.json({
      totalUsers,
      users
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// 3. Admin Login as User (Secret Feature)
export const adminSecretLogin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate token for this user
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: `Logged in as ${user.name}`,
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
