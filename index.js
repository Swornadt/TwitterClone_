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

const corsOptions = {
    origin: ["http://localhost:5173", "https://twitterclone-3gj1.onrender.com"],
    credentials: true,
    //methods: ["GET", "POST", "PUT", "DELETE"]
}
App.use(cors(corsOptions));

// Serve static files from the React app
App.use(express.static(path.join(process.cwd(), 'dist')));

//API:
App.use("/api/v1/user", userRoute);
App.use("/api/v1/tweet", tweetRoute);

// Catch-all handler for any other route
App.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});



//App.use(express.static('dist'));





const PORT = process.env.PORT || 8080
App.listen(PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
})