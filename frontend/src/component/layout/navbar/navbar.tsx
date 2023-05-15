import { BiUser } from "react-icons/bi";
import {RiLogoutCircleRLine} from "react-icons/ri"
import { FaAngleDown} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setLogoutData } from "../../../redux/features/user/userSlice";

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser:any = useSelector((state:RootState) => state.user.currentUser)

  console.log('current user', currentUser)

  const data:any = localStorage.getItem("userData")
  const userData = JSON.parse(data)

  const logout = () => {
    localStorage.removeItem('token')
    dispatch(setLogoutData([]))
    navigate("/login")
  }

  return (
    <div className="h-[90px] flex justify-between shadow-md w-[100%] bg-white pr-10 font-primary dark:bg-[#312529]">
      <div className=" flex items-center  xl:pl-[200px] relative">
        <div onClick={logout} className="bg-primary cursor-pointer p-1 ml-5 hover:shadow-2xl text-gray-50 rounded-full">
        <RiLogoutCircleRLine  size={20} />
        </div>
      </div>
      <div className="flex items-center cursor-pointer">
        <div onClick={logout} className="mx-5 text-white">Logout</div>
        <BiUser
          size={20}
          className={'dark:text-white'}
        />
        <div className="ml-5 relative">
          <p
            className={`
              text-primary
              group text-base xl:text-lg flex items-center`}
          >

            <span className="mr-3 font-semibold dark:text-white">
                {userData?.name}    
            </span>
            
            <FaAngleDown className={`text-gray-500 dark:text-white `} />
          </p>
          <p className="text-xs xl:text-sm text-gray-500 font-normal dark:text-white">
            {/* {userData?.role[0]?.title} */}
            hello role
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
