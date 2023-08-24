import React, { useState, useEffect } from "react";
import AgentModal from "./AgentModal";

const Dashboard = ({ activeTab, setIsBlurBackground, isBlurBackground }) => {
  const [leads, setLeads] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [assignedPosts, setAssignedPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(0);
  const [leadname, setLeanname] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch leads data from the API
    fetch("http://localhost:8080/restapi/leads")
      .then((response) => response.json())
      .then((data) => {
        setLeads(data);
        const newPosts = data.filter((lead) => lead.status === "New");
        const assignedPosts = data.filter((lead) => lead.status === "Pending");

        setNewPosts(newPosts);
        setAssignedPosts(assignedPosts);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);

  const filterednewPosts = newPosts.filter((x) =>
    x.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredassignedPosts = assignedPosts.filter((x) =>
    x.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredleads = leads.filter((x) =>
    x.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (id, name) => {
    setId(id);
    setLeanname(name);
    setIsModalOpen(true);
    setIsBlurBackground(true);
  };

  const closeModal = () => {
    setId(null);
    setLeanname("");
    setIsModalOpen(false);
    setIsBlurBackground(false);
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
        const updatedLeads = leads.filter((lead) => lead.id !== id);
        const updatednewPosts = updatedLeads.filter(
          (lead) => lead.status === "New"
        );
        const updatedassignedPosts = updatedLeads.filter(
          (lead) => lead.status === "Pending"
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

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Status", accessor: "status" },
    { Header: "Assigned To", accessor: "assignedTo" },
  ];

  return (
    <div id="myTabContent">
      <div
        className={`${
          isBlurBackground ? "filter blur-lg" : ""
        } transition-all duration-500`}
      >
        <div>
          <div
            className={`${
              activeTab === "newposts" ? "bg-gray-100" : "hidden"
            } dark:bg-gray-800`}
            id="newposts"
            role="tabpanel"
            aria-labelledby="newposts-tab"
          >
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
            <div className="overflow-x-auto">
              <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-100 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.Header} scope="col" className="px-6 py-3">
                        {column.Header}
                      </th>
                    ))}
                    <th key="Assign" scope="col" className="px-6 py-3">
                      Agent List
                    </th>
                    <th key="delete" scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-scroll">
                  {filterednewPosts.map((lead) => (
                    <tr
                      key={lead.id}
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {columns.map((column) => (
                        <td className="w-4 p-4" key={column.Header}>
                          <div className="flex items-center">
                            {lead[column.accessor]}
                          </div>
                        </td>
                      ))}
                      <td className="w-4 p-4" key="Assign">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              openModal(
                                lead.id,
                                lead.firstName + " " + lead.lastName
                              );
                            }}
                            className="border border-blue-300 w-30 hover:shadow-md rounded-lg text-black focus:outline-none text-sm px-3.5 py-1.5 text-center"
                          >
                            Show AgentList
                          </button>
                        </div>
                      </td>
                      <td className="w-4 p-4" key="Assign">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="border border-red-300 w-30 hover:shadow-md rounded-lg text-black focus:outline-none text-sm px-3.5 py-1.5 text-center"
                          >
                            Delete
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

        <div>
          <div
            className={` ${
              activeTab === "status" ? "bg-gray-100" : "hidden"
            } dark:bg-gray-800`}
            id="Assignedposts"
            role="tabpanel"
            aria-labelledby="Assignedposts-tab"
          >
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

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-100 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.Header} scope="col" className="px-6 py-3">
                        {column.Header}
                      </th>
                    ))}

                    <th key="delete" scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredleads.map((lead) => (
                    <tr
                      key={lead.id}
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {columns.map((column) => (
                        <td className="w-4 p-4" key={column.Header}>
                          <div className="flex items-center">
                            {lead[column.accessor]}
                          </div>
                        </td>
                      ))}

                      <td className="w-4 p-4" key="Assign">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="border border-red-300 w-30 hover:shadow-md rounded-lg text-black focus:outline-none text-sm px-3.5 py-1.5 text-center"
                          >
                            Delete
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

        <div>
          <div
            className={` ${
              activeTab === "Assignedposts" ? "bg-gray-100" : "hidden"
            } dark:bg-gray-800`}
            id="Assignedposts"
            role="tabpanel"
            aria-labelledby="Assignedposts-tab"
          >
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
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.Header} scope="col" className="px-6 py-3">
                        {column.Header}
                      </th>
                    ))}

                    <th key="delete" scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredassignedPosts.map((lead) => (
                    <tr
                      key={lead.id}
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {columns.map((column) => (
                        <td className="w-4 p-4" key={column.Header}>
                          <div className="flex items-center">
                            {lead[column.accessor]}
                          </div>
                        </td>
                      ))}

                      <td className="w-4 p-4" key="Assign">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="border border-red-300 w-30 hover:shadow-md rounded-lg text-black focus:outline-none text-sm px-3.5 py-1.5 text-center"
                          >
                            Delete
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
      <AgentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        id={id}
        leadname={leadname}
      />
    </div>
  );
};

export default Dashboard;
