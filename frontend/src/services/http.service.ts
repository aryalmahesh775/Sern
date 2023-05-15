import { getToken } from "../helpers/functions";
import {http} from "../config/axios"
import { StatusCodes } from "http-status-codes";
import { AxiosResponse } from "axios";

const getHeaders = (is_strict=false) => {
    let headers:{[cx:string]:string} = {"accept":"application/json", "content-type":"application/json"};
    if(is_strict) {
        headers["authorization"] = 'Bearer ' +getToken();
    }
    return headers;
} 

export const postRequest = async <T>(url:string, data:any, is_strict = false):Promise<AxiosResponse<T>> => {
    return http.post(url,data, {
        headers: getHeaders(is_strict)
    });
}

export const getRequest= <T>(url:string, is_strict = false, signal: AbortSignal | undefined = undefined):Promise<T> => {
    let opt = {
        signal: signal,
        headers: getHeaders(is_strict)
    }
    if(!signal) delete opt.signal
    return new Promise((resolve, reject) => {
        http.get(url, opt).then((response) => {
            if((response && response.status) && (response.status === StatusCodes.OK || response.status === StatusCodes.CREATED)){
                resolve(response.data);
            } else {
                reject(response);
            }
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const updateRequest = async (url:string, data:any, is_strict = false) => {
    return http.put(url,data, {
        headers: getHeaders(is_strict)
    });
}

export const deleteRequest = async (url: string, is_strict = false) => {
    return http.delete(url, {
        headers: getHeaders(is_strict)
    });
}