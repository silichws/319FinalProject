import React, { useState, useEffect } from "react";
import "./App.css";

const Plants = () => {
  const [plants, setPlants] = useState([]);

  const [newPlantform, setNewPlantForm] = useState({
    name: "",
    tempRange: "",
    humRange: "",
    age: "",
    src: "",
  });
  // src: http://127.0.0.1:8081/images/ for plant images in backend

  const [formValidationErrors, setFormValidationErrors] = useState({});

  useEffect(() => {
    fetch("http://localhost:8081/getPlants")
      .then((response) => response.json())
      .then((data) => {
        console.log("setting data:");
        console.log(data);
        loadInfo(data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlantForm({ ...newPlantform, [name]: value });
    setFormValidationErrors({ ...formValidationErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (newPlantform.name.trim() === "") {
      errors.name = "name is required";
    }
    if (newPlantform.tempRange.trim() === "") {
      errors.tempRange = "Temperature is required";
    }
    if (newPlantform.humRange.trim() === "") {
      errors.humRange = "Humidity is required";
    }

    if (Object.keys(errors).length === 0) {
      // Validation correct. Put API call here
      console.log("new plant");
      console.log(newPlantform);
      console.log("attempting to post new plant");
      await fetch("http://localhost:8081/addPlant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: newPlantform.name,
          tempRange: newPlantform.tempRange,
          humRange: newPlantform.humRange,
          age: newPlantform.age,
          src: newPlantform.src,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      setNewPlantForm({
        name: "Updated",
        tempRange: "",
        humRange: "",
        age: "",
        src: "",
      });
    } else {
      setFormValidationErrors(errors);
    }
  };

  var renderedOutput = plants.map((plant) => (
    <div key={plant.name}>
      <div className="col" id="left-plant">
        <div id="card1" className="card collapse show shadow-sm">
          <div id="imgPlant1">
            <img src={plant.src} className="card-img-top" alt="..."></img>
          </div>
          <div className="card-body">
            <p id="txtPlant1" className="card-text">
              {plant.name} <br></br>
              Temprature Range: {plant.tempRange} <br></br>
              Humidity Range: {plant.humRange} <br></br>
              Age: {plant.age}
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
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          {renderedOutput}
        </div>
      </div>
      <h2>Add Plant</h2>
      <div className="g-3 col-md-3 formBorder">
        <form className="row" id="checkout-form" onSubmit={handleSubmit}>
          <label>Name</label> <br></br>
          <input
            type="text"
            id="name"
            name="name"
            value={newPlantform.name}
            onChange={handleChange}
            className={`form-control ${
              formValidationErrors.name ? "is-invalid" : ""
            }`}
          ></input>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Plant Name is required</div>
          <br></br>
          <label>Temprature Range:</label> <br></br>
          <input
            type="text"
            id="temp"
            name="tempRange"
            value={newPlantform.tempRange}
            onChange={handleChange}
            className={`form-control ${
              formValidationErrors.tempRange ? "is-invalid" : ""
            }`}
          ></input>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Temperature Range is required</div>
          <br></br>
          <label>Humidity Range: </label> <br></br>
          <input
            type="text"
            id="hum"
            name="humRange"
            value={newPlantform.humRange}
            onChange={handleChange}
            className={`form-control ${
              formValidationErrors.humRange ? "is-invalid" : ""
            }`}
          ></input>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Humidity Range is required</div>
          <br></br>
          <label>Age</label>
          <br></br>
          <input
            type="text"
            id="age"
            name="age"
            className={`form-control ${
              formValidationErrors.age ? "is-invalid" : ""
            }`}
            value={newPlantform.age}
            onChange={handleChange}
          ></input>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Age is required</div>
          <br></br>
          <label>Link to plant image</label>
          <br></br>
          <input
            type="text"
            id="imgsrc"
            name="src"
            className={`form-control ${
              formValidationErrors.link ? "is-invalid" : ""
            }`}
            value={newPlantform.src}
            onChange={handleChange}
          ></input>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">A link is required</div>
          <br></br>
          <button type="submit" className="btn btn-md btn-primary">
            Add Plant
          </button>
        </form>
      </div>
    </div>
  );
};
export default Plants;
