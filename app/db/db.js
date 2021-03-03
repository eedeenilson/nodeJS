"use strict";

var mysql = require("mysql");

//local mysql db connection
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "tulipanes",
  database: "nodejs",
});

module.exports = pool;
