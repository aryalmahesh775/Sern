import {Request, Response, NextFunction, ErrorRequestHandler} from "express";

export const notFound = (req:Request, res:Response, next:NextFunction) => {
    // const error = new Error(`Not Found : ${req.originalURL}`)
    const error = new Error(`Not Found : `)
    res.status(404);
    next(error)
}

export const errorHandler = (err:any,req:Request, res:Response, next:NextFunction) => {
    const errorCodes = [400,401, 403, 404, 422]
    const statusCode = errorCodes.includes(err?.code) ? err.code :500;
    res.status(statusCode);
    res.json({
        message: err?.message,
        stack: err?.stack
    })
}