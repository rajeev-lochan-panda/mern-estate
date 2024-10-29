// export const signUp = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export const test = (req, res) => {
  res.json({ message: "Hello World" });
};
