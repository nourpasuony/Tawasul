import { Router } from "express";

import { specificUserById } from "../Controllers/user.controller.mjs";
// userModification
import uploadSingleImage from "../Middleware/uploadFile.mjs";
import { auth } from "../Middleware/auth.middleware.mjs";
const Route = Router();

//get user info by id 
// Route.put("/user/:userId", specificUserById);
Route.get("/user/:userId", specificUserById);

// update user info (name or phone or about)
// Route.put("/user", auth , uploadSingleImage("userPhoto"), userModification);

export default Route;
