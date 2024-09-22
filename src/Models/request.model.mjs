import { Schema, model, Types } from "mongoose";

const requestSchema = Schema({
  pickup: {
    lat: String,
    long: String,
    // required: true,
  },
  dropoff: {
    lat: String,
    long: String,
    // required: true
  },
  passengerId: {
    type: Types.ObjectId,
    ref: "User",
  },
  driverId: {
    type: Types.ObjectId,
    ref: "User",
  },
  trip_type: {
    type: String,
    enum: ["Delivery", "Shipping", "Travel"],
    default: "Delivery",
  },
  trip_rate:{
    type: Types.ObjectId,
    ref: "TripRate",
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
  Price: {
    type: Number
  },
  comment: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  distance: {
    type: Number,
  },
});



requestSchema.index({ pickupLocation: '2dsphere' });

const Request = model("Request", requestSchema);
export default Request;
