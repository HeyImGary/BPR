const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://GarySJames:Dexter4821@cluster0.fnv7n.mongodb.net/food?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
