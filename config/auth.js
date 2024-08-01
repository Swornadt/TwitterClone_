import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config ({
    path: "../config/.env"
})

const isAuthed = async ( req, res, next ) => {
    const token = req.cookies.token;
    console.log("Token received:", token);
    if (!token) {
        return res.status(401).json({
            message: "User not authenticated.",
            success: false
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
}

export default isAuthed;