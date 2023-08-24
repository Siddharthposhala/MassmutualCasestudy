/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";

const Sidebar = ({ activeTab, handleTabClick, isBlurBackground }) => {
  return (
    <div className="sticky top-0 z-20  bg-blue-900 text-white h-screen p-4">
      <div
        className={`${
          isBlurBackground ? "filter blur-lg" : ""
        } transition-all duration-500`}
      >
        <ul
          className="mt-2 flex-wrap sm:text-m lg:text-lg font-medium text-center"
          id="myTab"
          role="tablist"
          style={{ justifyContent: "flex-start" }} // Add this inline style
        >
          <li role="presentation">
            <a
              className={`inline-block p-4 ${
                activeTab === "newposts"
                  ? "border-b-2 border-white"
                  : "border-transparent"
              } cursor-pointer hover:text-gray-300 hover:border-gray-300 dark:hover:text-gray-300`}
              id="newposts-tab"
              type="button"
              role="tab"
              aria-controls="newposts"
              aria-selected={activeTab === "newposts"}
              onClick={() => handleTabClick("newposts")}
            >
              New Posts
            </a>
          </li>
          <li role="presentation">
            <a
              className={`inline-block p-4 ${
                activeTab === "Assignedposts"
                  ? "border-b-2 border-gray-900"
                  : "border-transparent"
              } cursor-pointer hover:text-gray-300 hover:border-gray-300 dark:hover:text-gray-300`}
              id="Assignedposts-tab"
              type="button"
              role="tab"
              aria-controls="Assignedposts"
              aria-selected={activeTab === "Assignedposts"}
              onClick={() => handleTabClick("Assignedposts")}
            >
              Assigned Posts
            </a>
          </li>
          <li role="presentation">
            <a
              className={`inline-block p-4 ${
                activeTab === "status"
                  ? "border-b-2 border-gray-900"
                  : "border-transparent"
              } cursor-pointer hover:text-gray-300 hover:border-gray-300 dark:hover:text-gray-300`}
              id="status-tab"
              type="button"
              role="tab"
              aria-controls="status"
              aria-selected={activeTab === "status"}
              onClick={() => handleTabClick("status")}
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
