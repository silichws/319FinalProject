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

  useEffect(() => {
    fetch("http://localhost:8081/list")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // var container = document.getElementById("showData");
        // container.innerHTML = JSON.stringify(data, undefined, 2);
        console.log(data);
        loadInfo(data);
      })
      .catch((error) => {
        console.log("error: data not found");
      });
  }, []);

  function loadInfo(data) {
    var mainContainer = document.getElementById("show");
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      let timestamp = data[i].id;
      let temp = data[i].temp;
      let humid = data[i].humidity;
      //   console.log("setting");
      //   console.log(timestamp);

      labels.push(timestamp);
      temperatures.push(temp);
      humidity.push(humid);
      //   console.log(labels);
      //   let price = data[i].price;
      //   let description = data[i].description;
      //   let imageUrl = data[i].imageUrl;
      //   let div = document.createElement("div");
      //             div.innerHTML = `
      //   <h3>${name}</h3>
      //   ${price} <br>
      //   ${description} <br>
      //   <img src=${imageUrl} width="200"> <br> <br>
      //   `;
      //   mainContainer.appendChild(div);
      //   console.log(div);
    }
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
      <h1 id="topThing">Data Management</h1>

      <Line data={data} options={options} />

      <div>
		<hr></hr>
		<div className="apiCalls">
		<Form />
        <DeleteForm />
		<EditForm />
		</div>
        
      </div>

      {/* <div id="showData"></div> */}
    </div>
  );
};
export default Info;
