import React, { useState, useEffect } from "react";
import "./App.css";

const Plants = () => {
  const [plants, setPlants] = useState([]);

  const [newPlantform, setNewPlantForm] = useState({
    name: "",
    tempRange: "",
    humRange: "",
    age: "",
  });

  useEffect(() => {
    fetch("http://localhost:8081/getPlants")
      .then((response) => response.json())
      .then((data) => {
        console.log("setting data:");
        console.log(data);
        loadInfo(data.plants);
      })
      .catch((error) => {
        console.log("error: data not found");
      });
  }, []);

  function loadInfo(data) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      plants.push(element);
    }
    console.log("plants array after load: ");
    console.log(plants);
  }

  var renderedOutput = plants.map((plant) => (
    <div key={plant.name}>
      <div class="col" id="left-plant">
        <div id="card1" class="card collapse show shadow-sm">
          <div id="imgPlant1">
            <img src={plant.src} class="card-img-top" alt="..."></img>
          </div>
          <div class="card-body">
            <p id="txtPlant1" class="card-text">
              <p class="card-text">
                <p className="card-text">
                  {plant.name} <br></br>
                  Temprature Range: {plant.tempRange} <br></br>
                  Humidity Range: {plant.humRange} <br></br>
                  Age: {plant.age}
                </p>
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div>
        <h2 id="plantHeader">Meet our plants</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          {renderedOutput}
        </div>
      </div>
      <h2>Add Plant</h2>
      <form>
        <label>Name</label> <br></br>
        <input></input>
        <br></br>
        <label>Temprature Range:</label> <br></br>
        <input></input> <br></br>
        <label>Humidity Range: </label> <br></br>
        <input></input>
        <br></br>
        <label>Age</label>
        <br></br>
        <input></input>
        <br></br>
        <button type="submit" className="btn btn-md btn-primary">
          Add Plant
        </button>
      </form>
    </div>
  );
};
export default Plants;
