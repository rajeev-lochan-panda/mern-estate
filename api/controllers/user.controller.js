import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "Hello World" });
};

export const updateUser = async (req, res) => {
  if (req.params.id !== req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        {
          new: true,
        }
      );
      const { password, ...others } = updatedUser._doc;
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: others,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
