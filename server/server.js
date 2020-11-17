const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apiPort = 3001;

const db = require("./db");
const recipeRouter = require("./routes/recipe-router");
const userRouter = require("./routes/user-router");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection Error"));

app.get("/", (req, res) => {
  res.json("Hello World");
  console.log("hi");
});

app.use("/recipes", recipeRouter);
app.use("/user", userRouter);

app.listen(apiPort, () => console.log("Server ruiing at port", apiPort));
