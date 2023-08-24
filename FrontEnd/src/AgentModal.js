import React from "react";

import { useState, useEffect } from "react";
import "./App.css";

const AgentModal = ({ isOpen, onClose, id, leadname }) => {
  const [agentslist, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch leads data from the API
    fetch("http://localhost:8080/restapi/login")
      .then((response) => response.json())
      .then((data) => {
        setLeads(data);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);

  // Define table columns and data
  const columns = [
    { Header: "UserName", accessor: "username" },
    { Header: "Role", accessor: "role" },
  ];

  const handleAssign = async (username, id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/restapi/leads/assign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, id }),
        }
      );

      if (response.ok) {
        window.location.reload();
        console.log("Agent assigned successfully");
      } else {
        console.error("Error assigning agent:", response.statusText);
      }
    } catch (error) {
      console.error("Error assigning agent:", error);
    }
  };

  const agents = agentslist.filter((agent) => agent.role === "Agent");

  const filteredAgents = agents.filter((agent) =>
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"} z-10`}>
      <div className="flex items-center justify-center h-screen">
        <div className="ml-20 flex-wrap bg-white p-6 bg-gray-100  border border-gray-300 rounded-lg shadow-2xl focus:ring focus:ring-blue-300 relative w-2/3 h-2/3 ">
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 bg-Red-500"
            onClick={onClose} // Close the modal when clicked
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="h-full overflow-hidden">
            <h1 className="sm:text-xl lg:text-3xl flex-wrap font-semibold mb-8">
              Agent List{" "}
            </h1>
            <p className="font-semibold">Asign agent to : {leadname}</p>
            <div className="mt-4 relative p-2 ">
              {" "}
              <input
                type="text"
                className=" border border-indigo-300 w-full h-12 rounded focus:outline-none px-3 focus:shadow-md"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />{" "}
              <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>{" "}
            </div>
            <br></br>

            <div className="h-full overflow-y-scroll">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-100 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.Header} scope="col" className="px-6 py-3">
                        {column.Header}
                      </th>
                    ))}
                    <th key="Assign" scope="col" className="px-6 py-3">
                      Assign
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((lead) => (
                    <tr
                      key={lead.id}
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {columns.map((column) => (
                        <td className="w-4 p-4" key={column.Header}>
                          {" "}
                          <div className="flex items-center">
                            {lead[column.accessor]}
                          </div>
                        </td>
                      ))}
                      <td className="w-4 p-4" key="Assign">
                        {" "}
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              handleAssign(lead.username, id);
                              onClose();
                            }}
                            className="border border-blue-300 w-30 hover:shadow-md rounded-lg text-black focus:outline-none text-sm px-3.5 py-1.5 text-center"
                          >
                            Assign Agent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentModal;
