import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"

dotenv.config({
    path: ".env"
});

databaseConnection();
const App = express();

// Serve static files from the React app (assuming the build folder is at the root level)
App.use(express.static(path.join(__dirname, 'build')));

// The catch-all handler
App.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//basic middlewares:
App.use(express.urlencoded({
    extended: true
}));
App.use(express.json());
App.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
App.use(cors(corsOptions));

//API:
App.use("/api/v1/user", userRoute);
App.use("/api/v1/tweet", tweetRoute);


App.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
})