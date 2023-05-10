// custom error handler
export const customError = (errMessage:any, errStatus:any) => {
    const error:any = new Error(errMessage)
    error.code = errStatus
    throw error
}

// Success Response
export const SuccessResponse = (msg:any, code:any, result?:any) => {
    return {
        message:msg,
        code,
        result
    }
}