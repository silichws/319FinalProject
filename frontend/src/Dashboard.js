import React, { useState, useEffect } from "react";
import GaugeComponent from "react-gauge-component";
import "./App.css";

const Dashboard = () => {
  const guageProps = {
    height: 300,
    width: 600,
    fill: "#ccc",
  };
  const gaugeStyle = {
    color: "#ccc",
  };
  const [timestamp, setTimestamp] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [humidity, sethumidity] = useState([]);

  const [timestamp2, setTimestamp2] = useState([]);
  const [temperature2, setTemperature2] = useState([]);
  const [humidity2, sethumidity2] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/most-recent/1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadInfo(data);
      })
      .catch((error) => {
        console.log("error: data not found");
        setTimestamp(
          "Error: Data not found for location 2. See README for setting up Mongo connection."
        );
        setTemperature(73);
        sethumidity(55);
      });
    fetch("http://localhost:8081/most-recent/2")
      .then((response) => response.json())
      .then((data) => {
        console.log("second data grab");
        console.log(data);
        loadInfo2(data);
      })
      .catch((error) => {
        console.log("error: data not found");
        setTimestamp2(
          "Error: Data not found for Location 2. See README for setting up Mongo connection."
        );
        setTemperature2(73);
        sethumidity2(55);
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
  function loadInfo2(data) {
    console.log(data.length);
    let timestamp = data[0].id;
    let temp = data[0].temp;
    let humid = data[0].humidity;
    setTimestamp2(timestamp);
    setTemperature2(temp);
    sethumidity2(humid);
  }

  return (
    <div>
      <div className="aboveGuage">
        <h1>Dashboard</h1>
        <h3>Location 2</h3>
        <p>Last data Last recorded temperature taken at {timestamp} cst.</p>
      </div>
      <div className="controlGuages">
        <div className="guageBorder">
          <h3 className="aboveGuage">Temperature {temperature}ºF</h3>
          <GaugeComponent
            style={guageProps}
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
            }}
            value={temperature}
            minValue={35}
            maxValue={100}
          />
        </div>
        <div className="guageBorder">
          <h3 className="aboveGuage">Humidity {humidity}%</h3>
          <GaugeComponent
            style={guageProps}
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              subArcs: [
                {
                  limit: 40,
                  color: "#F5CD19",
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
                    text: "Too high humidity!",
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

      <div className="aboveGuage">
        <h3>Location 2</h3>
        <p>Last data Last recorded temperature taken at {timestamp2} cst.</p>
      </div>
      <div className="controlGuages">
        <div className="guageBorder">
          <h3 className="aboveGuage">Temperature {temperature2}ºF</h3>
          <GaugeComponent
            style={guageProps}
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
            }}
            value={temperature2}
            minValue={35}
            maxValue={100}
          />
        </div>
        <div className="guageBorder">
          <h3 className="aboveGuage">Humidity {humidity2}%</h3>
          <GaugeComponent
            style={guageProps}
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              subArcs: [
                {
                  limit: 40,
                  color: "#F5CD19",
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
                    text: "Too high humidity!",
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
            value={humidity2}
            minValue={10}
            maxValue={90}
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
