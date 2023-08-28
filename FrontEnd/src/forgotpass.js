/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import emailjs from "emailjs-com";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Forgot = () => {
  const [username, setUsername] = useState("");
  const [admindata, setAdmindata] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/restapi/login")
      .then((response) => response.json())
      .then((data) => {
        setAdmindata(data);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    if (username === "") {
      alert("Enter username");
    } else {
      const adminfield = admindata.find((admin) => admin.username === username);
      if (!adminfield) {
        alert("Username not Found");
      } else {
        emailjs
          .send(
            "service_v9fle7l",
            "template_o0xlrnh",
            {
              to_email: adminfield.email,
              username: adminfield.username,
              password: adminfield.password,
            },
            "wPn-8niLsVs8w2vjz"
          )
          .then((response) => {
            alert("Password sent to Registered email");
          })
          .catch((error) => {
            console.error("Error sending email:", error);
            alert("Error sending email");
          });
      }
    }
  };

  const handleBack = (e) => {
    navigate("/");
  };

  return (
    <div>
      <section className="h-full bg-neutral-200 dark:bg-neutral-700 lg:mt-40">
        <div className="container h-full p-10 ">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-2/6">
              <div className="block rounded-2xl bg-white shadow-2xl dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-full">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-bold">
                          Forgot Password ?
                        </h4>
                      </div>

                      <form>
                        <div>
                          <label
                            htmlFor="text"
                            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Enter Username
                          </label>
                          <input
                            type="text"
                            name="text"
                            id="email"
                            value={username}
                            onChange={handleUsernameChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Username"
                          ></input>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={handleBack}
                            className="mt-5 text-sm font-medium text-blue-700 hover:text-blue-900 "
                          >
                            <span className="text-black no-underline">
                              Remember Password?
                            </span>{" "}
                            <span className="underline">Log In</span>
                          </button>
                        </div>
                        <button
                          onClick={handlePassword}
                          type="button"
                          className=" mt-4 mr-10 bgbutton w-full hover:bg-indigo-900 rounded-lg text-white text-sm px-5 py-2.5 text-center"
                        >
                          Enter
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forgot;
