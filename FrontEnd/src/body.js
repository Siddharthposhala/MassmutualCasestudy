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
  const tableBodyHeight = "500px";

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
    // { Header: "ID", accessor: "id" },
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
          isBlurBackground ? " filter blur-lg" : ""
        } transition-all duration-500`}
      >
        <div>
          <div className={`${activeTab === "newposts" ? " " : "hidden"} `}>
            <div className="mt-4 relative p-2 ">
              {" "}
              <input
                type="text"
                className="transition-transform duration-500 transform hover:scale-105 w-5/6 m-4 h-12 rounded-lg outline-none px-3 shadow-md"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />{" "}
              <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>{" "}
            </div>

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
                          className="sticky top-0 px-6 py-3  bg-gray-300"
                        >
                          {column.Header}
                        </th>
                      ))}
                      <th
                        key="Assign"
                        scope="col"
                        className="sticky top-0 px-6 py-3  bg-gray-300"
                      >
                        Agent List
                      </th>
                      <th
                        key="delete"
                        scope="col"
                        className="sticky top-0 px-6 py-3  bg-gray-300"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filterednewPosts.map((lead) => (
                      <tr key={lead.id}>
                        {columns.map((column) => (
                          <td
                            key={column.Header}
                            className="px-6 py-4 text-center"
                          >
                            {lead[column.accessor]}
                          </td>
                        ))}
                        <td className="px-6 py-4 text-center" key="Assign">
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
                        </td>
                        <td className="px-6 py-4 text-center " key="delete">
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="border border-red-300 w-30 hover:shadow-md rounded-lg text-black focus:outline-none text-sm px-3.5 py-1.5 text-center"
                          >
                            Delete
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

        <div>
          <div
            className={` ${
              activeTab === "status" ? " " : "hidden"
            } dark:bg-gray-800`}
          >
            <div className="mt-4 relative p-2 ">
              {" "}
              <input
                type="text"
                className="transition-transform duration-500 transform hover:scale-105 w-5/6 m-4 h-12 rounded-lg outline-none px-3 shadow-md"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />{" "}
              <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>{" "}
            </div>
            <div className="flex flex-col h-screen mt-2 m-6">
              <div
                className="flex-grow overflow-auto outline-none shadow-xl rounded-lg"
                style={{ maxHeight: tableBodyHeight }}
              >
                <table className="relative w-full border">
                  <thead className="uppercase">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={column.Header}
                          scope="col"
                          className="sticky top-0 px-6 py-3  bg-gray-300"
                        >
                          {column.Header}
                        </th>
                      ))}

                      <th
                        key="delete"
                        scope="col"
                        className="sticky top-0 px-6 py-3  bg-gray-300"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredleads.map((lead) => (
                      <tr key={lead.id}>
                        {columns.map((column) => (
                          <td
                            key={column.Header}
                            className="px-6 py-4 text-center"
                          >
                            {lead[column.accessor]}
                          </td>
                        ))}

                        <td className="px-6 py-4 text-center " key="delete">
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="border border-red-300 w-30 hover:shadow-md rounded-lg text-black focus:outline-none text-sm px-3.5 py-1.5 text-center"
                          >
                            Delete
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

        <div>
          <div
            className={` ${
              activeTab === "Assignedposts" ? " " : "hidden"
            } dark:bg-gray-800`}
          >
            <div className="mt-4 relative p-2 ">
              {" "}
              <input
                type="text"
                className="transition-transform duration-500 transform hover:scale-105  w-5/6 m-4 h-12 rounded-lg outline-none px-3 shadow-md"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />{" "}
              <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>{" "}
            </div>
            <div className="flex flex-col h-screen mt-2 m-6">
              <div
                className="flex-grow overflow-auto outline-none shadow-xl rounded-lg "
                style={{ maxHeight: tableBodyHeight }}
              >
                <table className="relative w-full border">
                  <thead className="uppercase">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={column.Header}
                          scope="col"
                          className="sticky top-0 px-6 py-3  bg-gray-300"
                        >
                          {column.Header}
                        </th>
                      ))}

                      <th
                        key="delete"
                        scope="col"
                        className="sticky top-0 px-6 py-3  bg-gray-300"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredassignedPosts.map((lead) => (
                      <tr key={lead.id}>
                        {columns.map((column) => (
                          <td
                            key={column.Header}
                            className="px-6 py-4 text-center"
                          >
                            {lead[column.accessor]}
                          </td>
                        ))}

                        <td className="px-6 py-4 text-center " key="delete">
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="border border-red-300 w-30 hover:shadow-md rounded-lg text-black focus:outline-none text-sm px-3.5 py-1.5 text-center"
                          >
                            Delete
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