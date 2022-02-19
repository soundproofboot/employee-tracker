const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "soundproofboot",
    password: "upicmemberservices",
    database: "workforce",
  },
);

module.exports = connection;