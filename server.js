const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  try {
    sequelize.authenticate();
    res.json({ message: "Connection has been established successfully." });
  } catch (error) {
    res.json({ message: `Unable to connect to the database: ${error}` });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
