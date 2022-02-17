const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "soundproofboot",
    password: "upicmemberservices",
    database: "workforce",
  },
  console.log("Connected to the workforce database.")
);

module.exports = connection;