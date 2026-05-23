import type { Request, Response } from "express";
import { pool } from "../../dataBase";
import { userService } from "./user.service";
import sendResponse from "../../middleware/utils/sendRseponse";


const createUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        const result = await userService.createDB(req.body)
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created successfully",
            data: result.rows[0]

        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        });

    }

}

const allUser = async (req: Request, res: Response) => {


    try {
        const result = await userService.allUserDB()
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User registered successfully",
            data: result.rows

        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        });
    }

}


const SingleUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const result = await userService.singleDB(id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User registered successfully",
            data: result.rows[0]

        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 404,
            success: false,
            message: error.message,
            error: error
        });

    }

}

const updateUser = async (req: Request, res: Response) => {
    const { name, email, role } = req.body;
    const { id } = req.params;
    try {
        const result = await userService.updateDB(req.body, id as string)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User registered successfully",
            data: result.rows[0]

        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: error.message,
                error: error
            });
        }
    }

}


const deletedUser = async (req: Request, res: Response) => {
    const { name, email, role } = req.body;
    const { id } = req.params;
    try {
        const result = await userService.deleteDB(id as string);

        sendResponse(res, {
            statusCode: 204,
            success: true,
            message: "User deleted successfully",
            data: result.rows[0]

        });
    } catch (error: unknown | string) {

        if (error instanceof Error) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: error.message,
                error: error
            });
        }

    }

}

export const userController = {
    createUser,
    allUser,
    SingleUser,
    updateUser,
    deletedUser

}