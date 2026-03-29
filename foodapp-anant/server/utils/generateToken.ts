import { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model"; // Assuming you have a UserDocument type

const ONE_DAY_IN_MS = 1 * 24 * 60 * 60 * 1000;

export const getTokenCookieOptions = (): CookieOptions => {
    const isProduction = process.env.NODE_ENV === "production";

    return {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    };
};

export const generateToken = (res: Response, user: IUserDocument) => {
    // Create the token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
        expiresIn: '1d' // Token will expire in 1 day
    });

    // Set the cookie
    res.cookie("token", token, getTokenCookieOptions());
    
    // You can still return the token if your frontend needs it for some reason
    return token;
};
