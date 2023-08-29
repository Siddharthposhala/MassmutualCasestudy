/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./App.css";
import { format } from "date-fns";

const LeadHistory = ({ isOpen2, onClose2, leadname }) => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/restapi/leads")
      .then((response) => response.json())
      .then((data) => {
        const formattedLeads = data.map((lead) => ({
          ...lead,
          insertionTime: format(
            new Date(lead.insertionTime),
            "do MMMM, yyyy HH:mm"
          ),
          assignedTime: lead.assignedTime
            ? format(new Date(lead.assignedTime), "do MMMM, yyyy HH:mm")
            : "-",
        }));
        setLeads(formattedLeads);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);
  console.log(leads);

  useEffect(() => {
    if (leads.length > 0) {
      const filtered = leads.filter((lead) => lead.firstName === leadname);
      setFilteredLeads(filtered);
    }
  }, [leadname, leads]);
  console.log(filteredLeads, leadname);

  const columns = [
    { Header: "Posted At", accessor: "insertionTime" },
    { Header: "Assigned To", accessor: "assignedTo" },
    { Header: "Assigned At", accessor: "assignedTime" },
  ];

  const tableBodyHeight = "200px";
  const height2 = "800px";

  return (
    <div className={`fixed inset-0 ${isOpen2 ? "block" : "hidden"} z-10 `}>
      <div className="flex items-center justify-center h-screen   ">
        <div className="ml-20 flex-wrap bg-white p-6  border border-gray-300 rounded-lg shadow-2xl focus:ring focus:ring-blue-300 relative w-6/12 h-3/6">
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 bg-Red-500"
            onClick={onClose2}
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
              History of {leadname}
            </h1>

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
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id}>
                        {columns.map((column) => (
                          <td
                            key={column.Header}
                            className="px-4 py-2 text-center"
                          >
                            {lead[column.accessor]}
                          </td>
                        ))}
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

export default LeadHistory;
