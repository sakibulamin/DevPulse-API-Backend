import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../dataBase";
import config from "./config";
import type { Rols } from "./types";
import sendResponse from "./utils/sendRseponse";

const auth = (...roles: Rols[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;


            if (!token) {
                return sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: "Unauthorized"

                });

            }


            const decoded = jwt.verify(token, config.secret as string) as JwtPayload;

            const userData = await pool.query(`
                  SELECT * FROM users WHERE email=$1
                 `, [decoded.email])

            const user = userData.rows[0];
            if (roles.length && !roles.includes(user.role)) {
                return sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: "You have no access!"

                });
            }
            req.user = decoded
            next();

        } catch (error) {
            if (error instanceof Error) {
                sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: error.message,

                });
            }
        }
    }
};

export default auth;