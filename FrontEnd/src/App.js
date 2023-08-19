import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Admin from "./admin";
import Agent from "./agent";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/agent" element={<Agent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
