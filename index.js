// import cors from "cors";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config } from "dotenv";

// to get variables from .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, "./.env") });

import "./src/Models/db.js";

import bodyParser from "body-parser";

import { Sock } from "./src/sockets/Socket.mjs";
import { authRoute, userRoute, requestRoute ,uploadImagesRoute} from "./src/Routes/index.mjs";

// otpRoute
import express from "express";
const app = express();

import { createServer } from "http";
const httpServer = createServer(app);

import { Server } from "socket.io";
// import apiLimiter from "./src/Middleware/rateLimiting.mjs";

// config middleware cors
const io = new Server(httpServer, {
  connectionStateRecovery: { maxDisconnectionDuration: 1000 },
});



export default io ;

// this to show the view chatForm file in home path
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
//   })
// );

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());

// Serve uploaded images
app.use("/uploads", express.static("./src/uploads"));

// const helmet = require('helmet');
// app.use(helmet());

app.get("/", function (req, res) {
  res.json({
    data: "home",
    status: "200",
  });
});

Sock(io);

// routes
// app.use("/api/v1/" , apiLimiter);
app.use("/api/v1/", authRoute, userRoute, requestRoute ,uploadImagesRoute);

//connect with socket.io server
httpServer.listen(process.env.PORT, () => {
  console.log(`server is run in : http://localhost:${process.env.PORT}`);
});
