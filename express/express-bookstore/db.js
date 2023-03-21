/** Database config for database. */


const { Client } = require("pg");
const { DB_URI } = require("./config");

let db = new Client({
  user: 'sagarprasad63574',
  host: 'localhost',
  database: DB_URI,
  password: 'Wizard101pirate101!',
  port: 5432,
});

db.connect();


module.exports = db;
