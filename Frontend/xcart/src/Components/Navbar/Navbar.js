import React from "react";
// import { IconButton } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
    console.log("loggedout");
  };

  // console.log(localStorage.getItem("balance"));

  return (
    <nav className="bg-customPurple ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center flex-wrap">
          <div className="text-white text-3xl textFont">xCart</div>
          <div className="space-x-5 flex items-center">
            <div className="text-white">{localStorage.getItem("balance")}</div>
            <div className="text-white">{localStorage.getItem("username")}</div>
            <div className="text-white">Help</div>
            <Link to="/">
              <div className="text-white text-animation">Home</div>
            </Link>
            <button
              onClick={logout}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
