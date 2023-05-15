import axios from "axios";
// import {}

export const http = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URI,
    responseType:"json",
    timeout:30000,
    timeoutErrorMessage: "Request time out",
    headers:{
        withCredentials:true
    }
})

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        throw error
    }
)