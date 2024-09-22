import twilio from "twilio";

const sendSms = async (phone, otp) => {
  try {
    const client = new twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    client.messages.create({
      from:process.env.TWILIO_PHONE_NUMBER,
      body: `Your OTP code is ${otp}`,
      to:phone,
    });
  
  } catch (error) {
    console.log(error.message);
  }
};
export default sendSms;
