import { Router } from "express";
import { passengerSendTripRate , getAllTripRatesforDriver } from "../Controllers/trip_rate.controller.mjs";
import { auth, authorize } from "../Middleware/auth.middleware.mjs";

const Route = Router();

Route.post("/passenger/rate", auth, authorize("passenger"), passengerSendTripRate);
Route.get("/driver/rates", auth, authorize("driver"), getAllTripRatesforDriver);

export default Route;
