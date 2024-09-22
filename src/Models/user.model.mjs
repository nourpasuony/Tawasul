import { compare, hash } from "bcrypt";
import { Schema, model } from "mongoose";
import validator from "validator";
import { roles } from "../Config/roles.mjs";
const userSchema = Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"], // the message error is not specific (modifay)
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone is required"], // the message error is not specific (modifay)
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "ar-EG");
        },
        message: (props) => `${props.value} is not a valid phone!`,
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 5,
    },
    photo: {
      type: String,
    },
    dateOfBirth: Date,
    token: String,
    role: {
      type: String,
      enum: roles,
      default: "passenger",
    },
    status: {
      type: String,
      enum: ["available", "onRide", "offline"],
    },
    location: {
      type: {
        type: String,
        // default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    socketId: { String },
  },
  {
    timestamps: true,
  }
);

// Check if password matches the user's password
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return compare(password, user.password);
};

// Check if password is modified before the user save
userSchema.pre("save", async function (next) {
  const user = this;

  // && !user.facebookId && !user.googleId && !user.appleId

  if (user.isModified("password")) {
    user.password = await hash(user.password, 8);
  }
  next();
});

userSchema.index({ location: "2dsphere" });

const User = model("User", userSchema);

export default User;
