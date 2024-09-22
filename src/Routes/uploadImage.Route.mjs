import { Router } from "express";
const Route = Router();
import upload from "../Middleware/cloudinaryUpload.mjs"
import uploadImages from "../Controllers/uploadimgs.controller.mjs";

Route.post("/upload", upload.array("images", 10), uploadImages);

export default Route;
