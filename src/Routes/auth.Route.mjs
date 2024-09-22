import { Router } from "express";
const Route = Router();
import { login, logout, register} from "../Controllers/auth.controller.mjs";


// login route
Route.post("/login", login);

// register route
Route.post("/register" , register);

// logout route
Route.post("/logout" , logout);



export default Route;
