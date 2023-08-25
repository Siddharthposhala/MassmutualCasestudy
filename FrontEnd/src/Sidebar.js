/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Sidebar = ({ activeTab, handleTabClick, isBlurBackground }) => {
  return (
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
          style={{ justifyContent: "flex-start" }} // Add this inline style
        >
          <li role="presentation">
            <a
              className={`inline-block w-full p-4 ${
                activeTab === "newposts"
                  ? "border border-blue-300 rounded-xl px-3.5 py-2 bgbutton text-white outline-none shadow-lg"
                  : "border-transparent text-black"
              } ${
                isBlurBackground ? "unclickable" : "cursor-pointer"
              } transition-transform duration-300 transform hover:scale-110`}
              id="newposts-tab"
              type="button"
              role="tab"
              aria-controls="newposts"
              aria-selected={activeTab === "newposts"}
              onClick={() => !isBlurBackground && handleTabClick("newposts")}
            >
              New Posts
            </a>
          </li>
          <li role="presentation">
            <a
              className={`inline-block w-full p-4 ${
                activeTab === "Assignedposts"
                  ? "border border-blue-300 rounded-xl px-3.5 py-2 bgbutton text-white outline-none shadow-lg"
                  : "border-transparent text-black"
              } ${
                isBlurBackground ? "unclickable" : "cursor-pointer"
              } transition-transform duration-300 transform hover:scale-110`}
              id="Assignedposts-tab"
              type="button"
              role="tab"
              aria-controls="Assignedposts"
              aria-selected={activeTab === "Assignedposts"}
              onClick={() =>
                !isBlurBackground && handleTabClick("Assignedposts")
              }
            >
              Assigned Posts
            </a>
          </li>
          <li role="presentation">
            <a
              className={`inline-block w-full p-4 ${
                activeTab === "status"
                  ? "border border-blue-300 rounded-xl px-3.5 py-2 bgbutton text-white outline-none shadow-lg"
                  : "border-transparent text-black"
              } ${
                isBlurBackground ? "unclickable" : "cursor-pointer"
              } transition-transform duration-300 transform hover:scale-110`}
              id="status-tab"
              type="button"
              role="tab"
              aria-controls="status"
              aria-selected={activeTab === "status"}
              onClick={() => !isBlurBackground && handleTabClick("status")}
            >
              All Posts
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;