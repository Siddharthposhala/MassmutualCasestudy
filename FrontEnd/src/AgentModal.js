/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./App.css";
import { useUser } from "./UserContext";

const AgentModal = ({ isOpen, onClose, id, leadname,setAdmin }) => {
  const user = useUser();
  const [agentslist, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const username = user.user.username;

  useEffect(() => {
    if (username) {
      fetch("http://localhost:8080/restapi/login")
        .then((response) => response.json())
        .then((data) => {
          setLeads(data);
          const loggedAdmin = data.find((admin) => admin.username === username);
          setAdmin(loggedAdmin);
        })
        .catch((error) => {
          console.error("Error fetching agents:", error);
        });
    }
  }, [username]);

  const columns = [
    { Header: "UserName", accessor: "username" },
    { Header: "Email", accessor: "email" },
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

  const tableBodyHeight = "300px";
  const height2 = "800px";

  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"} z-10 `}>
      <div className="flex items-center justify-center h-screen   ">
        <div className="ml-20 flex-wrap bg-white p-6  border border-gray-300 rounded-lg shadow-2xl focus:ring focus:ring-blue-300 relative w-6/12 h-3/4">
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 bg-Red-500"
            onClick={onClose}
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
          <div className=" overflow-hidden" style={{ maxHeight: height2 }}>
            <h1 className="sm:text-xl lg:text-3xl flex-wrap font-semibold mb-8">
              Agent List{" "}
            </h1>
            <p className="font-semibold">Asign agent to : {leadname}</p>
            <div className="mt-4 relative p-2 ">
              {" "}
              <input
                type="text"
                className=" border border-gray-200 rounded-lg w-5/6 h-12 rounded outline-none px-4 shadow-lg transition-transform duration-500 transform hover:scale-110"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />{" "}
              <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>{" "}
            </div>
            <br></br>

            <div className="flex flex-col h-screen mt-2 m-6">
              <div
                className="flex-grow overflow-auto rounded-lg outline-none shadow-xl"
                style={{ maxHeight: tableBodyHeight }}
              >
                <table className="relative w-full border">
                  <thead className="uppercase">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={column.Header}
                          scope="col"
                          className="sticky top-0 px-4 py-2  bg-gray-300"
                        >
                          {column.Header}
                        </th>
                      ))}

                      <th
                        key="delete"
                        scope="col"
                        className="sticky top-0 px-4 py-2  bg-gray-300"
                      >
                        Assign
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredAgents.map((lead) => (
                      <tr key={lead.id}>
                        {columns.map((column) => (
                          <td
                            key={column.Header}
                            className="px-4 py-2 text-center"
                          >
                            {lead[column.accessor]}
                          </td>
                        ))}

                        <td className="px-4 py-2 text-center " key="Assign">
                          <button
                            onClick={() => {
                              handleAssign(lead.username, id);
                              onClose();
                            }}
                            className=" bg-blue-600 w-30 hover:bg-blue-800 shadow-xl rounded-md text-white font-semibold focus:outline-none text-sm px-3.5 py-2 text-center"
                          >
                            Assign
                          </button>
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
    </div>
  );
};

export default AgentModal;
