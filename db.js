// const mongoose = require("mongoose");
// require("dotenv").config();
// // Define the MongoDB connection URL

// // const mongoURL = "mongodb://127.0.0.1:27017/hotels"; //Replace mydatabase with your database name
// const mongoURL = process.env.MONGODB_URL_LOCAL;
// // const mongoURL = process.env.MONGODB_URL;
// // Set up MongoDB connection

// mongoose.connect(mongoURL, {
//   useNewUrlParser: false,
//   useUnifiedTopology: true,
// });

// // Get the default connection
// // Mongoose maintains a default connection object representing the MongoDB connection

// const db = mongoose.connection;

// // Define event listeners for mongodb connections

// db.on("connect", () => {
//   console.log("Connected to MongoDB server");
// });

// db.on("error", (err) => {
//   console.log("MongoDB connection error", err);
// });

// db.on("disconnectd", () => {
//   console.log(" MongoDB disconnected");
// });

// // Exports the database connection

// module.exports = db;

const mongoose = require("mongoose");
require("dotenv").config();
// Define the MongoDB connection URL

// const mongoURL = "mongodb://127.0.0.1:27017/hotels"; //Replace mydatabase with your database name
const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = process.env.MONGODB_URL;
// Set up MongoDB connection

mongoose.connect(mongoURL, {
  useNewUrlParser: false,
  useUnifiedTopology: true,
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection

const db = mongoose.connection;

// Define event listeners for mongodb connections

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error", err);
});

db.on("disconnected", () => {
  console.log(" MongoDB disconnected");
});

// Exports the database connection

module.exports = db;
