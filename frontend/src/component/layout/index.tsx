import { useEffect } from 'react'
import {Outlet} from "react-router-dom";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";
import { getRequest } from "../../services/http.service";
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../redux/features/user/userSlice';

const Layout = () => {

	const fetchRoleData = async() => {
		try {
			let response:any = await getRequest('user/me', true);
			localStorage.setItem("userData", JSON.stringify(response?.result))
		} catch (error) {
			console.log('error..while fetching role..', error)
		}
	}

	useEffect(() => {
		fetchRoleData()
	},[])

    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-expect-error
        dispatch(getCurrentUser(""))
    },[])

    return (
		<div className="flex dark:bg-gray-700 bg-gray-50">
			<div
				style={{transition: "width "}}
				className={`flex flex-col z-50 bg-gray-700 w-auto  h-screen    py-8
				  overflow-y-auto border-r transition`}
			>
				<Sidebar />
			</div>
			<div
				className={`w-full h-full overflow-y-auto`}
			>
				<div className="fixed top-0 right-0 w-full z-40">
					<Navbar />
				</div>
				<div className="p-[10px] mt-[93px] pl-[70px] md:pl-[10px] lg:pl-[17px] min-h-[90vh]">
					<Outlet />
				</div>
			</div>
		</div>
    )
}

export default Layout