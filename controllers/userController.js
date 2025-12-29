import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// export const myProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const user = await User.findById(userId).select("-password");

//         return res.json({
//             success: true,
//             user
//         });

//     } catch (error) {
//         return res.status(500).json({ 
//             success: false, 
//             error: error.message 
//         });
//     }
// };
  export const myProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePhoto: user.profilePhoto
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

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

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // text field
    if (req.body.name) {
      user.name = req.body.name;
    }

    // file field
    if (req.file) {
      user.profilePhoto = `/uploads/profile/${req.file.filename}`;
    }

    await user.save();

    res.json({
      success: true,
      msg: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword, confirmPassword } = req.body;

//     // 1. Validate that all fields are present
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     // 2. Validate that new passwords match
//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ msg: "Passwords do not match" });
//     }

//     // 3. Find User (using select('+password') ensures we get the password field even if schema hides it)
//     const user = await User.findById(req.user._id).select("+password");
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     // 4. Check if Current Password matches the DB hash
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Current password is incorrect" });
//     }

//     // 5. Prevent user from using the exact same password
//     const isSame = await bcrypt.compare(newPassword, user.password);
//     if (isSame) {
//       return res.status(400).json({ msg: "New password must be different from current" });
//     }

//     // 6. Hash the new password and save
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ msg: "Password changed successfully" });

//   } catch (err) {
//     console.error("Change Password Error:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    // Prevent same password
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) return res.status(400).json({ msg: "New password must be different from current" });

    // Save new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
