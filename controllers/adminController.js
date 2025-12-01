import User from '../models/User.js';  

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}); 

    console.log("all users", allUsers);

    res.status(200).json({
        success: true,
        count: allUsers.length,
        data: allUsers
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


