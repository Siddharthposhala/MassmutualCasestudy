/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import mass from "./mass.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { useUser } from "./UserContext";

const Login = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Create the login request payload
    const loginData = {
      username: username,
      password: password,
    };
    console.log(loginData);
    // Send the login request to the backend

    fetch("http://localhost:8080/restapi/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if login is successful
        if (data.success) {
          // Check if user is of admin role
          if (data.role === "Admin") {
            // Redirect to the home page
            sessionStorage.setItem("username", username);
            setUser(loginData);
            navigate("/admin");
          } else {
            // Display an error message for non-admin users
            alert("You must be an admin to login.");
          }
        } else {
          // Display an error message for invalid credentials
          alert("Invalid username or password.");
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div>
      <section className="h-full bg-neutral-200 dark:bg-neutral-700 lg:mt-20">
        <div className="container h-full p-10 ">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Admin Login
                        </h4>
                      </div>

                      <form onSubmit={handleLogin}>
                        <div>
                          <label
                            htmlFor="text"
                            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your email
                          </label>
                          <input
                            type="text"
                            name="text"
                            id="email"
                            value={username}
                            onChange={handleUsernameChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            required=""
                          ></input>
                        </div>
                        <div className="mt-10">
                          <label
                            htmlFor="password"
                            value={password}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handlePasswordChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                          ></input>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-start">
                            <div className="flex items-center h-5 mt-10">
                              <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                required=""
                              ></input>
                            </div>
                            <div className="ml-3 text-sm mt-10">
                              <label
                                htmlFor="remember"
                                className="text-gray-500 dark:text-gray-300"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                          <a
                            href=" "
                            className="mt-10 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <button
                          type="submit"
                          className="mt-10 bgbutton w-full hover:bg-indigo-900 rounded-lg text-white text-sm px-5 py-2.5 text-center"
                        >
                          Login in
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* <!-- Right column container with background and description--> */}
                  <div className="flex items-center justify-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-blue-900">
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12 ">
                      <a
                        href=" "
                        className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white mr-10 transition-transform duration-500 transform hover:scale-110"
                      >
                        <img className="w-44 h-10" src={mass} alt="logo" />
                      </a>
                      <h4 className="mb-6 text-xl font-semibold">
                        Case Study : Lead-Admin
                      </h4>
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

export default Login;
