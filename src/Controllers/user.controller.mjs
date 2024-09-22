import User from "../Models/user.model.mjs";

// const formatUserData = (userData) => ({
//   userName: userData.userName,
//   phone: userData.phone,
//   photo: userData.photo,
// });

const specificUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// const userModification = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { userName, about } = req.body;
//     const photo = req.file?.path;

//     const user = await User.findById(userId);
//     if (!user) {
//       ء;
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (userName) user.userName = userName;
//     if (photo) user.photo = photo;
//     if (about) user.about = about;

//     await user.save();

//     const updatedUser = await User.findById(userId);
//     const formattedUser = formatUserData(updatedUser);
//     res.status(202).json(formattedUser);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// userModification

export { specificUserById };
