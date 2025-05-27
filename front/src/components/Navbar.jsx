import React, { useContext } from "react";
import { Link } from "react-router";
import { themeStore } from "../context/themeContext";
import { userStore } from "../context/UserContext";
import button from "daisyui/components/button";

function Navbar() {
  const { themes, setTheme } = useContext(themeStore);

  const {user}=useContext(userStore)
  return (
    <div className="navbar bg-base-300 shadow-sm z-50 sticky top-0" >
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Chat App
        </Link>
      </div>
      <div className="navbar-center  flex">
        <ul className="menu menu-horizontal ">
          <li>
            <details>
              <summary>theme</summary>
              <ul className="p-2">
                {themes.map((theme) => (
                  <li onClick={()=>{setTheme(theme)
                    localStorage.setItem("theme",theme)
                  }} className="cursor-pointer px-4 py-1 hover:bg-secondary"> {theme}</li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
       { !user.userInfos?<><Link to={"/user/register"} className="btn">
          register
        </Link>
        <Link to={"/user/login"} className="btn">
          login
        </Link></>:
        <Link to={"/chat"}><button className="btn btn-primary">go to chat</button></Link>}
      </div>
    </div>
  );
}

export default Navbar;
