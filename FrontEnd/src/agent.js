/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { useUser } from "./UserContext";

const Agent = () => {
  const { user } = useUser();
  const [agentslist, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

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
    // { Header: "First Name", accessor: "firstName" },
    // { Header: "Last Name", accessor: "lastName" },
    { Header: "Role", accessor: "role" },
    // { Header: "Phone", accessor: "phone" },
    // { Header: "Status", accessor: "status" },
    // { Header: "Assigned To", accessor: "assignedTo" },
  ];
  const navigate = useNavigate();
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
        console.log("Agent assigned successfully");
        navigate("/admin");
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
    <div>
      {user ? (
        <div>
          <div className="py-10 h-screen bg-gray-300 px-2 bg-blue-800">
            <div className="w-full mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden lg:w-9/12 p-8">
              <h1>Agent List </h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="relative">
                  {" "}
                  <input
                    type="text"
                    className="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />{" "}
                  <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>{" "}
                </div>
                <br></br>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={column.Header}
                          scope="col"
                          className="px-6 py-3"
                        >
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
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
                              onClick={() => handleAssign(lead.username, id)}
                              className="ml-8 bgbutton w-30 hover:bg-blue-900 rounded-lg text-white text-sm px-3 py-2.5 text-center"
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
      ) : (
        <div>{navigate("/")}</div>
      )}
    </div>
  );
};

export default Agent;
