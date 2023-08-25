import React from "react";
import mass from "./mass.jpg";
import logout from "./logout.png";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-10 w-full">
      <div className="top-0 bg-blue-800 text-white p-4 flex justify-between items-center w-full">
        <h2 className="ml-10 sm:text-xl lg:text-2xl flex-wrap font-semibold ">
          LeadAdmin
        </h2>
        <a
          href=" "
          className="ml-160 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-44 h-10" src={mass} alt="logo" />
        </a>
        {user ? (
          <div className="flex items-center">
            <h2 className="mr-3 text-2xl font-semibold text-white dark:text-white">
              {user.username + "  "} |
            </h2>
            <button
              onClick={handleLogout}
              className="flex items-center text-white dark:text-white cursor-pointer transition-transform duration-500 transform hover:scale-110"
            >
              <img className="w-9 h-8" src={logout} alt="logo" />
            </button>
          </div>
        ) : (
          <div>{navigate("/")}</div>
        )}
      </div>
    </div>
  );
};

export default Header;
