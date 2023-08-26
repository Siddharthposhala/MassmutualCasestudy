/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./body";
import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("newposts");
  const [isBlurBackground, setIsBlurBackground] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const [assignedPosts, setAssignedPosts] = useState([]);
  const [ladmin, setAdmin] = useState([]);
 
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      {user ? (
        <div className="flex flex-col h-screen">
          <Header ladmin={ladmin} />
          <div className="flex flex-grow overflow-hidden">
            <div className="w-1/5">
              <Sidebar
                activeTab={activeTab}
                handleTabClick={handleTabClick}
                isBlurBackground={isBlurBackground}
                newPosts={newPosts}
                assignedPosts={assignedPosts}
              />
            </div>
            <div className="w-5/6 ">
              <Dashboard
                activeTab={activeTab}
                isBlurBackground={isBlurBackground}
                setIsBlurBackground={setIsBlurBackground}
                newPosts={newPosts}
                setNewPosts={setNewPosts}
                assignedPosts={assignedPosts}
                setAssignedPosts={setAssignedPosts}
                setAdmin={setAdmin}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>{navigate("/")}</div>
      )}
    </div>
  );
};

export default Admin;
