/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TabComponent = () => {
  const [leads, setLeads] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [assignedPosts, setAssignedPosts] = useState([]);

  useEffect(() => {
    // Fetch leads data from the API
    fetch("http://localhost:8080/restapi/leads")
      .then((response) => response.json())
      .then((data) => {
        setLeads(data);
        const newPosts = data.filter((lead) => lead.status === "Pending");
        const assignedPosts = data.filter(
          (lead) => lead.status === "Completed"
        );

        setNewPosts(newPosts);
        setAssignedPosts(assignedPosts);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);

  const [activeTab, setActiveTab] = useState("newposts");
  const navigate = useNavigate();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const assign = async (id) => {
    navigate(`/agent?id=${id}`);
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/restapi/leads/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Refresh the data after deletion
        const updatedLeads = leads.filter((lead) => lead.id !== id);
        const updatednewPosts = updatedLeads.filter((lead) => lead.status === "Pending");
        const updatedassignedPosts = updatedLeads.filter(
          (lead) => lead.status === "Completed"
        );
        setLeads(updatedLeads);
        setNewPosts(updatednewPosts);
        setAssignedPosts(updatedassignedPosts);
      } else {
        console.error("Error deleting lead:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  return (
    <div>
      <div className="mb-4 ">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <a
              className={`inline-block p-4 ${
                activeTab === "newposts"
                  ? "border-b-2 border-blue-500"
                  : "border-transparent"
              } cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
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
          <li className="mr-2" role="presentation">
            <a
              className={`inline-block p-4 ${
                activeTab === "Assignedposts"
                  ? "border-b-2 border-blue-500"
                  : "border-transparent"
              } cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
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
          <li className="mr-2" role="presentation">
            <a
              className={`inline-block p-4 ${
                activeTab === "status"
                  ? "border-b-2 border-blue-500"
                  : "border-transparent"
              } cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
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
      <div id="myTabContent">
        <br></br>
        {newPosts.map((lead) => (
          <div>
            <div
              className={`p-4 rounded-lg mb-8 ${
                activeTab === "newposts" ? "bg-gray-100" : "hidden"
              } dark:bg-gray-800`}
              id="newposts"
              role="tabpanel"
              aria-labelledby="newposts-tab"
            >
              <div className="flex">
                <div className="w-1/2 pr-2">
                  <p className="ml-5 text-sm text-left text-gray-600 dark:text-gray-400">
                    <strong className="font-medium text-gray-800 dark:text-white">
                      {lead["firstName"]} {lead["lastName"]}
                    </strong>
                    <br />
                    <br />
                    Email: {lead["email"]}
                    <br />
                    Mobile No: {lead["phone"]}
                  </p>
                </div>
                <div className="w-1/2 pl-2">
                  <button
                    onClick={() => assign(lead.id)}
                    className="mb-4 ml-10 bgbutton w-30 hover:bg-blue-900 rounded-lg text-white text-sm px-5 py-2.5 text-center"
                  >
                    Assign Agent
                  </button>

                  <button
                    onClick={() => handleDelete(lead.id)}
                    className=" ml-10 bg-red-500 w-30 hover:bg-red-700 rounded-lg text-white text-sm px-5 py-2.5 text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {assignedPosts.map((lead) => (
          <div>
            <div
              className={`p-4 rounded-lg mb-8 ${
                activeTab === "Assignedposts" ? "bg-gray-100" : "hidden"
              } dark:bg-gray-800`}
              id="Assignedposts"
              role="tabpanel"
              aria-labelledby="Assignedposts-tab"
            >
              <div className="flex">
                <div className="w-1/2 pr-2">
                  <p className="ml-5 text-sm text-left text-gray-600 dark:text-gray-400">
                    <strong className="font-medium text-gray-800 dark:text-white">
                      {lead["firstName"]} {lead["lastName"]}
                    </strong>
                    <br />
                    <br />
                    Email: {lead["email"]}
                    <br />
                    Mobile No: {lead["phone"]}
                    <br />
                    Status: {lead["status"]}
                    <br />
                    Assigned To: {lead["assignedTo"]}
                  </p>
                </div>
                <div className="w-1/2 pl-2">
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className=" ml-10 bg-red-500 w-30 hover:bg-red-700 rounded-lg text-white text-sm px-5 py-2.5 text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {leads.map((lead) => (
          <div>
            <div
              className={`p-4 rounded-lg mb-8 ${
                activeTab === "status" ? "bg-gray-100" : "hidden"
              } dark:bg-gray-800`}
              id="Assignedposts"
              role="tabpanel"
              aria-labelledby="Assignedposts-tab"
            >
              <div className="flex">
                <div className="w-1/2 pr-2">
                  <p className="ml-5 text-sm text-left text-gray-600 dark:text-gray-400">
                    <strong className="font-medium text-gray-800 dark:text-white">
                      {lead["firstName"]} {lead["lastName"]}
                    </strong>
                    <br />
                    <br />
                    Email: {lead["email"]}
                    <br />
                    Mobile No: {lead["phone"]}
                    <br />
                    Status: {lead["status"]}
                    <br />
                    Assigned To: {lead["assignedTo"]}
                  </p>
                </div>
                <div className="w-1/2 pl-2">
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className=" ml-10 bg-red-500 w-30 hover:bg-red-700 rounded-lg text-white text-sm px-5 py-2.5 text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabComponent;
