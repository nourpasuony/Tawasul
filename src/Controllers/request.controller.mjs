import Request from "../Models/request.model.mjs";
import User from "../Models/user.model.mjs";

import io from "../../index.js";

const sendrequest = async (req, res) => {
  try {
    const { _id } = req.user;
    const { ...details } = req.body;

    const userFound = await User.findOne({ _id });
    if (!userFound) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // search for the nearest drivers from the passenger
    const nearbyDrivers = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [details.pickup.lat, details.pickup.long],
          },
          $maxDistance: 5000,
        },
      },
      status: "available",
      role: "driver",
    }).sort("-score");

    if (nearbyDrivers.length == 0) {
      return res.status(200).json({
        success: true,
        data: "no drivers nearst your location",
      });
    }

    const passengerRequest = new Request({
      passengerId: _id,
      ...details,
    });
    // send the request to the nearest driver
    // test socket in this loop
    nearbyDrivers.forEach((driver) => {
      console.log(driver.socketId);
      io.to(driver.socketId).emit("newRequest", passengerRequest);
    });

    await passengerRequest.save();

    return res.status(201).json({
      success: true,
      data: nearbyDrivers,
    });
  } catch (error) {
    console.log("error");
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getAllRequestsAccepted = async (req, res) => {
  const { _id } = req.user;

  const passengerRequests = await Request.find({
    _id,
    status: "accepted",
  });

  if (passengerRequests.length == 0) {
    return res.status(200).json({
      success: true,
      data: "no request accepts, yet",
    });
  }

  return res.status(200).json({
    success: true,
    data: passengerRequests,
  });
};

const getAllRequestsInlocation = async (req, res) => {
  const { _id } = req.user;

  const userFound = await User.findOne({ _id });
  if (!userFound) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  
  const RequestsIntheSameLocation = await Request.find({pickup:userFound.location});

  if (RequestsIntheSameLocation.length == 0) {
    return res.status(200).json({
      success: true,
      data: "change your location to find offers",
    });
  }

  return res.status(200).json({
    success: true,
    data: RequestsIntheSameLocation,
  });
};
export { sendrequest, getAllRequestsAccepted, getAllRequestsInlocation };
