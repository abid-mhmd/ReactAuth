import User from "../models/User.js";

//get Profile

export const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      succes: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      messsage: error.messsage,
    });
  }
};

//Update Profile

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true, runValidators: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Logout

export const logoutUser = async (req, res) => {
  res.status(200).json({
    success: false,
    message: "Logout successful",
  });
};

//Upload image

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profileImage: req.file.path,
      },
      {
        new: true,
      },
    ).select("-password");

    res.status(200).json({
      succes: true,
      message: "Profile image uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};
