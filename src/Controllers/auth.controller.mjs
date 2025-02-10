import User from "../Models/user.model.mjs";
import generateToken from "../utils/authUtils.mjs";

const login = async (req, res) => {
  const { ...credentialData } = req.body;

  try {
    // Check if the user exists
    const found = await User.findOne({ phone: credentialData.phone });
    if (!found) {
      return res.status(404).json({ msg: "User not found", success: false });
    }
    // Validate the password
    const validPassword = await found.isPasswordMatch(credentialData.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid password", success: false });
    }
    // generate Token
    const token = generateToken({ _id: found._id, role: found.role });

    return res.status(200).json({
      data: {
        id: found._id,
        userName: found.userName,
        role: found.role,
        token,
      },
      success: true,
    });
  } catch (err) {
    res.status(500).send({ error: err.message, success: false });
  }
};

const register = async (req, res) => {
  const { ...details } = req.body;

  try {
    // Check if the user exists
    const found = await User.findOne({ phone: details.phone }).lean();
    if (!found) {
      const user = new User(details);
      await user.save();
      res
        .status(201)
        .json({ msg: "User registered successfully", success: true });
    } else {
      return res.status(400).json({ msg: "User already exists" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    req.headers["authorization"] = " ";

    res.status(200).json({
      message: "session out",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { login, register, logout };
