import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"
import path from 'path';

dotenv.config({
    path: ".env"
});

databaseConnection();
const App = express();

//basic middlewares:
App.use(express.urlencoded({
    extended: true
}));
App.use(express.json());
App.use(cookieParser());
App.use(express.static('dist'));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
App.use(cors(corsOptions));

//API:
App.use("/api/v1/user", userRoute);
App.use("/api/v1/tweet", tweetRoute);

const PORT = process.env.PORT || 8080
App.listen(PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
})