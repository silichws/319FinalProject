import React, { useState, useEffect } from "react";
import GaugeComponent from "react-gauge-component";
import "./App.css";

const Dashboard = () => {
  const chartStyle = {
    height: 600,
    width: 600,
    fill: "#ccc",
  };
  const gaugeStyle = {
    color: "#ccc",
  };
  const [timestamp, setTimestamp] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [humidity, sethumidity] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/most-recent")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadInfo(data);
      })
      .catch((error) => {
        console.log("error: data not found");
        setTimestamp("Data not found. Using hardcoded testing data");
        setTemperature(73);
        sethumidity(55);
      });
  }, []);

  function loadInfo(data) {
    console.log(data.length);
    let timestamp = data[0].id;
    let temp = data[0].temp;
    let humid = data[0].humidity;
    setTimestamp(timestamp);
    setTemperature(temp);
    sethumidity(humid);
  }

  return (
    <div>
      <h1>Dashboard</h1>
	  <p>Last data Last recorded temperature taken at {timestamp} cst.</p>
      <div className="controlGuages">
        <GaugeComponent
          style={chartStyle}
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            subArcs: [
              {
                limit: 50,
                color: "blue",
                showTick: true,
                tooltip: {
                  text: "Too low temperature!",
                },
              },
              {
                limit: 65,
                color: "lightblue",
                showTick: true,
                tooltip: {
                  text: "Low temperature!",
                },
              },
              {
                limit: 75,
                color: "#5BE12C",
                showTick: true,
                tooltip: {
                  text: "OK temperature!",
                },
              },
              {
                limit: 85,
                color: "#F5CD19",
                showTick: true,
                tooltip: {
                  text: "High temperature!",
                },
              },
              {
                color: "#EA4228",
                tooltip: {
                  text: "Too high temperature!",
                },
              },
            ],
          }}
          pointer={{
            color: "#345243",
            length: 0.8,
            width: 15,
            // elastic: true,
          }}
          labels={{
            valueLabel: {
              formatTextValue: (value) => "",
              style: { gaugeStyle },
            },
            tickLabels: {
              type: "outer",
              valueConfig: {
                formatTextValue: (value) => value + "ºF",
                fontSize: 10,
              },
              ticks: [{ value: 40 }, { value: 70 }, { value: 100 }],
            },
          }}
          value={temperature}
          minValue={30}
          maxValue={100}
        />
        <GaugeComponent
          style={chartStyle}
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            subArcs: [
              {
                limit: 40,
                color: "F5CD19",
                showTick: true,
                tooltip: {
                  text: "Too low humidity!",
                },
              },
              {
                limit: 60,
                color: "#5BE12C",
                showTick: true,
                tooltip: {
                  text: "OK humidity!",
                },
              },
              {
                color: "#EA4228",
                tooltip: {
                  text: "Too high temperature!",
                },
              },
            ],
          }}
          pointer={{
            color: "#345243",
            length: 0.8,
            width: 15,
            // elastic: true,
          }}
          labels={{
            valueLabel: {
              formatTextValue: (value) => "",
              style: { gaugeStyle },
            },
            tickLabels: {
              type: "outer",
              valueConfig: {
                formatTextValue: (value) => value + "ºF",
                fontSize: 10,
              },
              ticks: [{ value: 30 }, { value: 60 }, { value: 90 }],
            },
          }}
          value={humidity}
          minValue={10}
          maxValue={90}
        />
      </div>
    </div>
  );
};
export default Dashboard;
