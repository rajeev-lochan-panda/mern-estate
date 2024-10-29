import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Validate user input
  if (!(username && email && password)) {
    res.status(400).send("All input is required");
  }

  const newUser = new User({ username, email, password: hashedPassword });

  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  // Save user in the database
  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
    // res.status(500).json({ error: err.message });
  }
};
