import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    //check if the required fields are provided
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    //password hashing
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    //check if the user with email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup cntroller: ", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //finding email from database
    const fetchUser = await User.findOne({ email });

    //checking if the user is existing or not
    if (!fetchUser) {
      res.status(400).json({ message: "Invalid Creds!" });
    }

    //comparing password given by user and same in the database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      fetchUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid Creds!" });
    }

    //if user exists then login the user
    generateToken(fetchUser._id, res);
    res.status(200).json({
      _id: fetchUser._id,
      fullname: fetchUser.fullname,
      email: fetchUser.email,
      profilePic: fetchUser.profilePic,
    });
  } catch (error) {
    console.log("Error in Login Controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully!" });
  } catch (error) {
    console.log("Error in Logout Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Please provide profile pic" });
    }

    const uploadResponse = await cloudinary.uploader(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile: ", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
