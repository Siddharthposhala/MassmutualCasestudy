import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Admin from "./admin";
import Forgot from "./forgotpass";

function App() {
 
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/forgotpassword" element ={<Forgot/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
