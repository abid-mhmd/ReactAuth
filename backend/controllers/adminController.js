import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const admin = await User.findOne({ email });

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access Denied" });
    }

    const token = generateToken(admin._id);
    const adminResponce = admin.toObject();
    delete adminResponce.password;

    res.status(200).json({
      succes: true,
      message: "Admin Login Successful",
      token,
      admin: adminResponce,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({ succes: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { search } = req.query;

    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).select("-password");

    res.status(200).json({ succes: true, message: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validation

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ succes: false, message: "All fields are required" });
    }

    //exists check

    const exists = await User.findOne({ email });

    if (exists) {
      return res
        .status(400)
        .json({ succuss: false, message: "Email already exists" });
    }

    const hashPassoword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassoword,
    });

    const userResponce = user.toObject();
    delete userResponce.password;

    res
      .status(201)
      .json({
        succes: true,
        message: "User added successfully",
        user: userResponce,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
