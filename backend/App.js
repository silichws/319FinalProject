var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);
const collection = "piData";

app.get("/list", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection(collection)
    .find(query)
    .limit(100)
    .toArray();
  // console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/:id", async (req, res) => {
  const robotid = Number(req.params.id);
  console.log("Robot to find :", robotid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: robotid };
  const results = await db.collection("robots").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

app.post("/addRobots", async (req, res) => {
  console.log("adding new robot");
  await client.connect();
  // var key = Object.keys(req.body);
  var values = Object.values(req.body);
  console.log(values);

  const id = values[0];
  const name = values[1];
  const price = values[2];
  const description = values[3];
  const imageUrl = values[4];

  const newDoc = {
    id: id,
    name: name,
    price: price,
    description: description,
    imageUrl: imageUrl,
  };
  const results = await db.collection("robots").insertOne(newDoc);
  res.status(200);
  res.send(results);
});


app.delete("/deleteRobot", async (req, res) => {
  await client.connect();
  // console.log(req);
  var values = Object.values(req.body);
  const results = await db.collection("robots").deleteOne(values[0]);
  res.status(200);
  res.send(results);
});
