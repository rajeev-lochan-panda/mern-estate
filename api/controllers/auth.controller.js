import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Validate user input
  if (!(username && email && password)) {
    res.status(400).send({
      success: false,
      message: "All input is required",
    });
  }

  const newUser = new User({ username, email, password: hashedPassword });

  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(409).send({
      success: false,
      message: "User already exist. Please login instead",
    });
  }
  // Save user in the database
  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    // next(err);
    res.status(500).json({ error: err.message });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Validate user input
    if (!(email && password)) {
      res.status(400).send({
        success: false,
        message: "All input is required",
      });
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found, please signup",
      });
    }

    // Validate if user password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Wrong Credentials",
      });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...others } = user._doc;
    res
      .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        data: others,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...others } = user._doc;
      res
        .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .status(200)
        .json({
          success: true,
          message: "User logged in successfully",
          data: others,
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...others } = newUser._doc;
      res
        .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .status(200)
        .json({
          success: true,
          message: "User logged in successfully",
          data: others,
        });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
