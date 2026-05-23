
import type { Request, Response } from "express";
import { authService, } from "./auth.service";
import sendResponse from "../middleware/utils/sendRseponse";

const signupUser = async (req: Request, res: Response) => {

    try {
        const result = await authService.singinUserDB(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: result,

        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            sendResponse(res, {
                statusCode: 500,
                success: false,
                message: error.message,
                error: error
            });
        }
    }
};
const loginUser = async (req: Request, res: Response) => {
    try {

        const result = await authService.loginUserDB(req.body);


        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Login successful",
            data: result,

        });

    } catch (error) {
        if (error instanceof Error) {
            sendResponse(res, {
                statusCode: 500,
                success: false,
                message: error.message,
                error: error
            });
        }


    }
};

export const authController = {
    signupUser,
    loginUser

}