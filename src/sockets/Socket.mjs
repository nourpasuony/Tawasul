import Request from "../Models/request.model.mjs";
import User from "../Models/user.model.mjs";
export const Sock = (io) => {
  io.on("connection", (socket) => {
    socket.on("driverConnect", async (driverData) => {
      // Save driver data in database
      await User.findOneAndUpdate(
        { _id: driverData._id, role: "driver" },
        {
          socketId: socket.id,
          location: driverData.location.coordinates,
          status: "available",
        },
        { upsert: true }
      );

      // postman test
      //   {
      //     "_id": "66cdfde6dea824fa65d70d78",
      //     "location": {
      //         "coordinates": [
      //             22.254876,
      //             25.145248
      //         ]
      //     }
      // }
      
    });

    //driver accept request
    socket.on("acceptRequest", async (requestId, driverId) => {
      const request = await Request.findByIdAndUpdate(
        { _id: requestId },
        { status: "accepted", driverId }
      ).populate("passsengerId");

      const driverAccept = await User.findByIdAndUpdate(
        { _id: driverId, role: "driver" },
        { status: "onRide" }
      );

      // search for the nearest drivers from the passenger
      const nearbyDrivers = await User.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [
                driverAccept.coordinates.lat,
                driverAccept.coordinates.long,
              ],
            },
            $maxDistance: 5000,
          },
        },
        status: "available",
        role: "driver",
      }).sort("-score");

      // Inform other drivers that the trip has been accepted.
      nearbyDrivers.forEach((driver) => {
        if (driver._id != driverId) {
          io.to(driver.socketId).emit(
            "requestAccepted",
            "the other driver accept the offer"
          );
        }
        io.to(driver.socketId).emit(
          "requestAccepted",
          request.passengerId.phone
        );
      });

      // Inform other drivers that the trip has been accepted.
      // io.emit("requestAccepted", request._id);

      // Inform the passenger that the trip has been accepted.
      io.to(request.passengerId).emit("requestStatus", {
        message: "accepted",
        data: {
          driverName: driverAccept.userName,
          driverPhone: driverAccept.phone,
        },
      });
    });

    socket.on("driverDisconnected", async (driver) => {
      await User.findByIdAndUpdate(
        { _id: driver._id, role: "driver" },
        { status: "offline" }
      );
    });

    socket.on("disconnect", async () => {
      console.log("the socket is closed");
    });
  });
};
