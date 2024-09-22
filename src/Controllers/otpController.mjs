import generateOtp from "../utils/generateOtp.mjs";
import Otp from "../Models/otp.model.mjs";
import User from "../Models/user.model.mjs";
import sendSms from "../utils/sendSms.mjs";

const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    // Check if the user is already present
    const checkUserPresent = await User.findOne({ phone });

    // If user is found with the provided phone number
    if (checkUserPresent) {
      const otpFound = await Otp.findOne({ phone });
      const generatedOtp = await generateOtp();

      if (!otpFound) {
        const otp = new Otp({ phone, otp: generatedOtp });
        await otp.save();

        // await sendSms(phone , generatedOtp);

        return res.status(200).json({
          success: true,
          message: "OTP sent successfully",
        });
        
      } else {
        await Otp.updateOne({ phone }, { otp: generatedOtp });
        // await sendSms();
        return res.status(200).json({
          success: true,
          message: "OTP sent successfully",
        });
      }
    }

    // If user is not found
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  if (!otp) {
    return res
      .status(400)
      .json({ message: "OTP are required" });
  }

  const foundOtp = await Otp.findOne({phone, otp})
  if (!foundOtp) {
    return res.status(400).json({ message: "OTP not requested or expired" });
  }


  res.status(200).json({ message: "OTP verified successfully" });
};

export { sendOTP, verifyOTP };
