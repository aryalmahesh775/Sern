import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-auto px-10">
      <div className="flex px-10">
        <img
        //   src={`https://pbs.twimg.com/profile_images/956473307917778944/Ub9tBAqh_400x400.jpg`}
        src=""
          className="h-6"
          alt="logo"
        />
      </div>
      <div className="mt-10 ml-5">
        <li className="ml-5 space-y-2  list-none">
          <NavLink
            title={"Home"}
            className={`flex gap-5 items-center`}
            to={`/`}
            style={({ isActive }) => ({
              color: isActive ? "white" : "#9a9a9a",
              backgroundColor: "",
            })}
          >
            Home 
          </NavLink>
          <NavLink
            title={"role 2"}
            className={`flex gap-5 items-center`}
            to={`/post`}
            style={({ isActive }) => ({
              color: isActive ? "white" : "#9a9a9a",
              backgroundColor: "",
            })}
          >
            Post
          </NavLink>
          <NavLink
            title={"role 2"}
            className={`flex gap-7 items-center`}
            to={`/role`}
            style={({ isActive }) => ({
              color: isActive ? "white" : "#9a9a9a",
              backgroundColor: "",
            })}
          >
            Role
          </NavLink>
          
          <NavLink
            title={"role 2"}
            className={`flex gap-7 items-center`}
            to={`/user`}
            style={({ isActive }) => ({
              color: isActive ? "white" : "#9a9a9a",
              backgroundColor: "",
            })}
          >
            user
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;