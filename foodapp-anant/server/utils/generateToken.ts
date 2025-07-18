import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model"; // Assuming you have a UserDocument type

export const generateToken = (res: Response, user: IUserDocument) => {
    // Create the token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
        expiresIn: '1d' // Token will expire in 1 day
    });

    // Define the cookie options for production
    const cookieOptions = {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
        secure: true, // MUST be true for cross-site cookies on HTTPS
        sameSite: "none" as const // Allow cookie to be sent on cross-site requests
    };

    // Set the cookie
    res.cookie("token", token, cookieOptions);
    
    // You can still return the token if your frontend needs it for some reason
    return token;
};
