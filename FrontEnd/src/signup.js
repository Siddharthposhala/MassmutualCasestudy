/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import emailjs from "emailjs-com";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [admindata, setAdmindata] = useState([]);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const handleCpassChange = (e) => {
    setCpass(e.target.value);
  };

  const handleSignUp = async () => {
    if (pass !== cpass) {
      alert("Password not matching");
    } else {
      try {
        const response = await fetch("http://localhost:8080/restapi/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password: pass,
            role: "Admin",
            email,
          }),
        });

        if (response.ok) {
          alert("Successfully Signed up.");
          navigate("/");
        } else {
          alert("Sign up failed. Please try again.");
        }
      } catch (error) {
        alert("Error signing up:");
        console.error("Error signing up:", error);
      }
    }
  };

  const navigateBack = (e) => {
    navigate("/");
  };

  return (
    <div>
      <section className="h-full bg-neutral-200 dark:bg-neutral-700 lg:mt-16">
        <div className="container h-full p-10 ">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-2/6">
              <div className="block rounded-2xl bg-white shadow-2xl dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-full">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <h4 className="mb-12 pb-1 text-xl font-bold">
                          Create Your Account
                        </h4>
                      </div>

                      <form>
                        <div>
                          <label
                            htmlFor="text"
                            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Username
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
                        <div className="mt-3">
                          <label
                            htmlFor="email"
                            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="abc@email.com"
                            required=""
                          ></input>
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="pass"
                            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="pass"
                            id="pass"
                            value={pass}
                            onChange={handlePassChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="••••••••"
                            required=""
                          ></input>
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="cpass"
                            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Confrim Password
                          </label>
                          <input
                            type="password"
                            name="cpass"
                            id="cpass"
                            value={cpass}
                            onChange={handleCpassChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="••••••••"
                            required=""
                          ></input>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={navigateBack}
                            className="mt-4 text-sm font-medium text-blue-700 hover:text-blue-900 "
                          >
                            <span className="text-black no-underline">
                              Already have an account?
                            </span>{" "}
                            <span className="underline">Log In</span>
                          </button>
                        </div>
                        <button
                          onClick={handleSignUp}
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

export default SignUp;
