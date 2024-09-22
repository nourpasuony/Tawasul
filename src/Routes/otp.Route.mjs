import { Router } from "express";
const Route = Router();
import  {sendOTP} from "../Controllers/otpController.mjs";


Route.post("/reset-Password", sendOTP);
Route.post("/verify-Password", sendOTP);
export default Route;