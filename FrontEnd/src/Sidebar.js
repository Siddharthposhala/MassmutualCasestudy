/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import backgroundGif from "./dashboard.gif";

const Sidebar = ({
  activeTab,
  handleTabClick,
  isBlurBackground,
  newPosts,
  assignedPosts,
}) => {
  const totallen = newPosts.length + assignedPosts.length;
  return (
    <div className="relative">
      <div className="sticky top-0 z-20 rounded-lg bg-opacity-60 bg-blue-200 text-white h-screen p-4 ">
        <div
          className={`${
            isBlurBackground ? "filter blur-lg" : ""
          } transition-all duration-500`}
        >
          <ul
            className="mt-8 flex-wrap sm:text-sm lg:text-lg"
            id="myTab"
            role="tablist"
          >
            <li role="presentation" className="mt-4">
              <a
                className={`inline-block justify-center flex w-full p-3 ${
                  activeTab === "newposts"
                    ? "border border-blue-300 rounded-xl px-2.5 py-2 bgbutton text-white outline-none shadow-lg"
                    : "border-transparent text-black"
                } ${
                  isBlurBackground ? "unclickable" : "cursor-pointer"
                } transition-transform duration-300 transform hover:scale-105 bg-opacity-50 rounded-xl  py-2 bg-blue-300  `}
                onClick={() => !isBlurBackground && handleTabClick("newposts")}
              >
                New Posts
                <div className="ml-2 mt-1 right-0 bg-white text-black rounded-full w-5 h-5 text-sm flex justify-center items-center">
                  {newPosts.length}
                </div>
              </a>
            </li>
            <li role="presentation" className="mt-4">
              <a
                className={`inline-block justify-center flex w-full p-4 ${
                  activeTab === "Assignedposts"
                    ? "border border-blue-300 rounded-xl px-2.5 py-2 bgbutton text-white outline-none shadow-lg"
                    : "border-transparent text-black"
                } ${
                  isBlurBackground ? "unclickable" : "cursor-pointer"
                } transition-transform duration-300 transform hover:scale-105 bg-opacity-50 rounded-xl py-2 bg-blue-300  `}
                onClick={() =>
                  !isBlurBackground && handleTabClick("Assignedposts")
                }
              >
                Assigned Posts
                <div className="ml-2 mt-1 right-0 bg-white text-black rounded-full w-5 h-5 text-sm flex justify-center items-center">
                  {assignedPosts.length}
                </div>
              </a>
            </li>
            <li role="presentation" className="mt-4">
              <a
                className={`inline-block justify-center flex w-full p-4 ${
                  activeTab === "status"
                    ? "border border-blue-300 rounded-xl px-2.5 py-2 bgbutton text-white outline-none shadow-lg"
                    : "border-transparent text-black"
                } ${
                  isBlurBackground ? "unclickable" : "cursor-pointer"
                } transition-transform duration-300 transform hover:scale-105 bg-opacity-50 rounded-xl  py-2 bg-blue-300 `}
                onClick={() => !isBlurBackground && handleTabClick("status")}
              >
                All Posts
                <div className="ml-2 mt-1 right-0 bg-white text-black rounded-full w-5 h-5 text-sm flex justify-center items-center">
                  {totallen}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`hidden lg:block absolute bottom-0 left-0 bg-cover  ${
          isBlurBackground ? "filter blur-lg" : ""
        }`}
        style={{
          maxWidth: `99%`,
          width: `360px`,
          height: `400px`,
        }}
      >
        <img className="sticky" src={backgroundGif} alt="dashbord img" />
      </div>
    </div>
  );
};

export default Sidebar;
