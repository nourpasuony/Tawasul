import { Schema, model } from "mongoose";

const otpSchema = Schema({
  phone: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

const Otp = model("Otp", otpSchema);
export default Otp;