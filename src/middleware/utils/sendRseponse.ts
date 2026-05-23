import type { Response } from "express"


type TResopnse<T> = {
    statusCode: number,
    success: boolean,
    message?: string,
    data?: T,
    error?:unknown|string

}


const sendResponse = <T>(res: Response, data: TResopnse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error


    })

}
export default sendResponse;