
import jwt from 'jsonwebtoken';
import {tokenKeys} from "../Config/token.mjs"
// generate token 
const generateToken = (payload) => {
  const options = {
    expiresIn: '24h', // Token expiration time
  };

  const token = jwt.sign(payload, tokenKeys.secretKey, options);
  return token;
};

export default generateToken;