import { Schema, model, Types } from "mongoose";
const tripRateSchema = Schema(
  {
    passengerId: {
      type: Types.ObjectId,
      ref: "User",
    },
    driverId: {
      type: Types.ObjectId,
      ref: "User",
    },
    requestId: {
      type: Types.ObjectId,
      ref: "Request",
    },
    rate: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    comment: {
      type: String,
    },
    rateStart:{
        type:Date,
        default:Date.now
    }
  },
  {
    timestamps: true,
  }
);

const TripRate = model("TripRate", tripRateSchema);

export default TripRate;
