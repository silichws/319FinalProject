import "./App.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Info from "./Info";
import About from "./About";
import Plants from "./Plants";


const App = () => {

  const [isDashboard, setIsDashboard] = useState(true);
  const [isInfo, setIsInfo] = useState(false);
  const [isabout, setIsAbout] = useState(false);
  const [isPlants, setPlants] = useState(false);
  

  function showDash() {
    setIsDashboard(true);
    setIsInfo(false);
    setIsAbout(false);
    setPlants(false)
  }

  function showInfo() {
    setIsDashboard(false);
    setIsInfo(true);
    setIsAbout(false);
    setPlants(false)
  }

  function showIsAbout() {
    setIsDashboard(false);
    setIsInfo(false);
    setIsAbout(true);
    setPlants(false);
  }

  function showPlants(){
    setIsDashboard(false);
    setIsInfo(false);
    setIsAbout(false);
    setPlants(true);
  }

  return (
    <div> 
      <div className="buttons">
      <button
          className="btn btn-md btn-primary"
          id="navbtn"
          onClick={() => showDash()}
        >
          Dashboard
        </button>
        <button
          className="btn btn-md btn-primary"
          id="navbtn"
          onClick={() => showInfo()}
        >
          Information
        </button>
        <button
          className="btn btn-md btn-primary"
          id="navbtn"
          onClick={() => showPlants()}
        >
          Plants
        </button>
        <button
          className="btn btn-md btn-primary"
          id="navbtn"
          onClick={() => showIsAbout()}
        >
          About Us
        </button>
        
        <hr></hr>
      </div>
      <div className="dashboard" style={{ display: isDashboard ? "block" : "none" }}>
        <Dashboard />
      </div>
      <div className="info" style={{ display: isInfo ? "block" : "none" }}>
      <Info />
      </div>
      <div className="about" style={{ display: isabout ? "block" : "none" }}>
      <About />
      </div>
      <div className="plants" style={{ display: isPlants ? "block" : "none" }}>
      <Plants />
      </div>
      
    </div>
  );
};

export default App;
