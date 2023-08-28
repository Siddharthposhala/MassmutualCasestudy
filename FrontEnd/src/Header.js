import React, { useState } from "react";
import mass from "./mass.jpg";
import logout from "./logout.png";
import profileIcon from "./profile.png";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Header = ({ ladmin }) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const toggleProfileInfo = () => {
    setShowProfileInfo((prev) => !prev);
  };

  return (
    <div className="sticky top-0 z-10 w-full">
      <div className="top-0 bg-blue-800 text-white p-4 flex justify-between items-center w-full">
        <a
          href=" "
          className="ml-160 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="ml-12 w-44 h-10 transition-transform duration-500 transform hover:scale-110"
            src={mass}
            alt="logo"
          />
        </a>
        <h2 className="ml-10 sm:text-xl lg:text-3xl flex-wrap font-semibold ">
          LeadAdmin
        </h2>
        {user ? (
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={toggleProfileInfo}
                className=" mr-8 flex py-1.5 px-2 items-center  font-semibold text-xl  text-white "
              >
                Profile
                <img
                  className="ml-2 w-6 h-6 transition-transform duration-500 transform hover:scale-110"
                  src={profileIcon}
                  alt="profile"
                />
              </button>
              {showProfileInfo && (
                <div
                  className="fixed bg-white shadow-md p-4 rounded-md mt-2 mr-10 text-black"
                  style={{ right: 0, textAlign: "left" }}
                >
                  <div className="mb-2">
                    <h2 className="text-md font-semibold">
                      <span className="font-bold mr-2">Username:</span>
                      <span>{ladmin.username}</span>
                    </h2>
                  </div>
                  <div className="mb-4">
                    <h2 className="text-md font-semibold">
                      <span className="font-bold mr-2">Email:</span>
                      <span> {ladmin.email}</span>
                    </h2>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center font-bold"
                  >
                    Logout{" "}
                    <img
                      className="ml-2 w-6 h-7 transition-transform duration-500 transform hover:scale-110"
                      src={logout}
                      alt="logo"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>{navigate("/")}</div>
        )}
      </div>
    </div>
  );
};

export default Header;
