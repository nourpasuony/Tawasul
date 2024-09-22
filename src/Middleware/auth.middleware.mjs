import jwt from "jsonwebtoken";
import { tokenKeys } from "../Config/token.mjs";
// import tokenBlacklist from "../Models/tokenBlacklist.model.mjs";

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // const tokenBlocked = await tokenBlacklist.findOne({ token });
    // if (tokenBlocked) {
    //   return res.status(401).json({ message: "Token is blacklisted" });
    // }

    const decoded = jwt.verify(token, tokenKeys.secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

//check who can take permation
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export { auth, authorize };
