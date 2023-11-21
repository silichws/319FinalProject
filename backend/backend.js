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
  const id = req.params.id;
  console.log("Temp :", id);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: id };
  const results = await db.collection(collection).findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found in database").status(404);
  else res.send(results).status(200);
});

app.post("/add", async (req, res) => {
  await client.connect();
  var key = Object.keys(req.body);
  var values = Object.values(req.body);
  console.log(values);

  const id = values[0];
  const temp = values[1];
  const humidity = values[2];

  const newDoc = {
    id: id,
    temp: temp,
    humidity: humidity,
  };
  const results = await db.collection(collection).insertOne(newDoc);
  res.status(200);
  res.send(results);
});


app.delete("/delete", async (req, res) => {
  await client.connect();

  console.log(req.body["id"]);
  var values = Object.values(req.body["id"]);
  let query =  {id: new ObjectId(values)};
  const results = await db.collection(collection).deleteOne(query);
  // let results = "none";
  res.status(200);
  res.send(results);
});
