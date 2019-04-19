require('rootpath')();
require('dotenv').config();
// Any reason this is var while the rest are const?
var cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const jwt = require('helpers/jwt');
const db = require('helpers/db');
const API_PORT = process.env.API_PORT;
const app = express();
app.use(cors());

const routes = require('./controllers/routes');
// const users = require('./controllers/users');

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// // append /api for our http requests
// app.use("/api", users);
app.use("/api", routes);
// // use JWT auth to secure the api
// app.use(jwt());

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
