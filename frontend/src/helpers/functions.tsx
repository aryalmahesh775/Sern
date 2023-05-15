import { StatusCodes } from "http-status-codes";
import toast from "react-hot-toast";
import { BsFillMegaphoneFill } from "react-icons/bs";

export const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = tokenString ? JSON.parse(tokenString) : null;
  return userToken;
};

export const setToken = (userToken: string) =>
  localStorage.setItem("token", JSON.stringify(userToken));

export const removeToken = () => localStorage.clear();

export const notify = (message: string) =>
  toast.custom((t) => (
    <div
      className={`flex flex-row toaster-primary items-center  justify-between w-96 px-2 text-white shadow-2xl hover:shadow-none translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out
            ${t.visible ? "right-0" : "-right-96"}`}
    >
      <div className="text-xl border-l-2 px-2">
        <BsFillMegaphoneFill />
      </div>
      <div className="flex flex-col items-start w-96 justify-center ml-4 cursor-default">
        <p className="text-sm text-green-500 mt-2 leading-relaxed w-[320px] flex text-left tracking-wider py-4 px-2">
          {message}
        </p>
      </div>
    </div>
  ),
  {id:"success-notification", position:"top-right", duration:2000}
  );


  export const submitError = (message: string) =>
  toast.custom(
    (t) => (
      <div
        className={`flex flex-row toaster-danger items-center justify-between w-96 toaster-danger px-2 bg-primary shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out 
        
        `}
      >
        <div className="text-xl border-l-2 px-[6px]">
          <BsFillMegaphoneFill className="text-white" />
        </div>
        <div className="flex flex-col items-start w-[300px] justify-center ml-3 cursor-default">
          <p
            className="text-sm text-white mt-2 pr-[22px] flex text-left leading-relaxed tracking-wider py-4"
            dangerouslySetInnerHTML={{ __html: message }}
          ></p>
        </div>
      </div>
    ),
    { id: "error-notification", position: "top-right", duration:1000 }
  );

  export const submitMultipleError = (errorObj:any) => {
    let msg_text="";
    if(Object.keys(errorObj.result).length){
        let all_errors = errorObj.result;

        Object.keys(all_errors).forEach((key) => {
            msg_text += all_errors[key] +"<br/>";
        })
        submitError(msg_text);
    } else {
        submitError(errorObj.msg)
    }
  }

  export const respondError = (response:any) => {
    const status = response.response ? response.response.status : null;
    if(status === StatusCodes.UNAUTHORIZED) { //401
        // removeToken();
        // window.location.href ="/login"
        console.log("Unauthorized call request....")
    } else if(status === StatusCodes.FORBIDDEN) { //403
        submitError(response.response.data.message);
        // window.history.back();
    } else if (status === StatusCodes.INTERNAL_SERVER_ERROR){ //500
        submitError("Internal Server Error...");
        return Promise.reject(response.response ?? response)
    }  else if (status === StatusCodes.BAD_REQUEST){ //400
        submitError(response.response.data.message);
        return Promise.reject(response.response ?? response)
    } else if(status === 422) {
        submitError(response.response.data.message);
    } else {
        return Promise.reject(response.response ?? response)
    }
  }