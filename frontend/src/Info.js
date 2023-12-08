import React, { useState, useEffect } from "react";
import "./info.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Form from "./Form";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";
Chart.register(...registerables);

const Info = () => {
  const [labels, setLabels] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [humidity, sethumidity] = useState([]);

  const [labels2, setLabels2] = useState([]);
  const [temperatures2, setTemperatures2] = useState([]);
  const [humidity2, sethumidity2] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/list/1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadInfo(data);
      })
      .catch((error) => {
        console.log("error: data not found");
      });

    fetch("http://localhost:8081/list/2")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadInfo2(data);
      })
      .catch((error) => {
        console.log("error: data not found");
      });
  }, []);

  function loadInfo(data) {
    console.log("data length " + labels.length);

    for (var i = 0; i < data.length; i++) {
      let timestamp = data[i].id;
      let temp = data[i].temp;
      let humid = data[i].humidity;

      labels.push(timestamp);
      temperatures.push(temp);
      humidity.push(humid);
    }
    console.log(labels.length);
  }

  function loadInfo2(data) {
    console.log("data length " + labels.length);

    for (var i = 0; i < data.length; i++) {
      let timestamp = data[i].id;
      let temp = data[i].temp;
      let humid = data[i].humidity;

      labels2.push(timestamp);
      temperatures2.push(temp);
      humidity2.push(humid);
    }
    console.log(labels.length);
  }

  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "Temperature °F",
        data: temperatures.reverse(),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Humidity %",
        data: humidity.reverse(),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const data2 = {
    labels: labels2.reverse(),
    datasets: [
      {
        label: "Temperature °F",
        data: temperatures2.reverse(),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Humidity %",
        data: humidity2.reverse(),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1 className="topThing">Data Management</h1>
      <h3 className="topThing">Location 1</h3>
      <Line data={data} options={options} />

      <hr></hr>
      <br></br>
      <h3 className="topThing">Location 2</h3>
      <Line data={data2} options={options} />

      <div>
        <hr></hr>

        <div className="apiCalls">
          <Form />
          <DeleteForm />
          <EditForm />
        </div>
      </div>
    </div>
  );
};
export default Info;
