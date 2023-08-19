/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import mass from "./mass2.jpg";
import TabComponent from "./tabs";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const { user } = useUser();
  const [leads, setLeads] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [assignedPosts, setAssignedPosts] = useState([]);

  const navigate = useNavigate();
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

  return (
    
    <div>
      {user ? (
        <div>
          <link
            rel="stylesheet"
            href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
          />
          <link
            rel="stylesheet"
            href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
          />

          <section className="pt-16 bg-blue-800">
            <div className="w-full lg:w-9/12 px-4 mx-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center p-10">
                    <div className="w-full px-4 flex justify-center">
                      <img className="w-60 h-30" src={mass} alt="logo" />
                    </div>
                    <div className="w-full px-4 text-center mt-10">
                      <div className="ml-20 flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {newPosts.length}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            New Posts
                          </span>
                        </div>
                        <div className="mr-2 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {assignedPosts.length}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Assigned Posts
                          </span>
                        </div>

                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {leads.length}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Total Posts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      <p>Admin: {user.username}</p>
                    </h3>
                  </div>
                  <div className="mt-10 py-10  border-blue-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <TabComponent />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="relative  pt-8 pb-6 mt-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-white font-semibold py-1">
                      MAss Mutual CaseStudy.
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>
        </div>
      ) : (
        <div>{navigate("/")}</div>
      )}
    </div>
  );
};

export default Admin;
