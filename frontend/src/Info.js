import React, { useState } from "react";

const Info = () => {

	// function getInfo() {
	fetch("http://localhost:8081/list")
		.then((response) => response.json())
		.then((data) => {
		// console.log(data);
		var container = document.getElementById("showData");
		container.innerHTML = JSON.stringify(data, undefined, 2);
		console.log(data);
		// loadInfo(data);
		});
	//   }

  function loadInfo(data) {
    var mainContainer = document.getElementById("show");
    for (var i = 0; i < data.length; i++) {
      let name = data[i].name;
      let price = data[i].price;
      let description = data[i].description;
      let imageUrl = data[i].imageUrl;
      let div = document.createElement("div");
      //             div.innerHTML = `
      //   <h3>${name}</h3>
      //   ${price} <br>
      //   ${description} <br>
      //   <img src=${imageUrl} width="200"> <br> <br>
      //   `;
      mainContainer.appendChild(div);
      console.log(div);
    }
  }

  return (
    <div>
      <h1>Info</h1>
	  <div id="showData">

	  </div>
    </div>
  );
};
export default Info;
