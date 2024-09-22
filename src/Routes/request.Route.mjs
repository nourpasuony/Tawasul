import { Router } from "express";

import { sendrequest, getAllRequestsAccepted, getAllRequestsInlocation } from "../Controllers/request.controller.mjs";
import { auth, authorize } from "../Middleware/auth.middleware.mjs";

const Route = Router();

Route.post("/request", auth, authorize("passenger"), sendrequest);
Route.get("/requests", auth, authorize("passenger"), getAllRequestsAccepted);
Route.get("/requests", auth, authorize("driver"), getAllRequestsInlocation);

export default Route;
