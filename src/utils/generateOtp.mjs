import otpGenerator from "otp-generator";

// Generate a 6-digit numeric OTP
const generateOtp = async () => {
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    alphabets: false,
  });

 return otp;
};
export default generateOtp;
