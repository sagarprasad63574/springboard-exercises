/** Database connection for messagely. */


const { Client } = require("pg");
const { DB_URI } = require("./config");

// const client = new Client(DB_URI);
const client = new Client({
    user: 'sagarprasad63574',
    host: 'localhost',
    database: DB_URI,
    password: 'Wizard101pirate101!',
    port: 5432,
});

client.connect();


module.exports = client;
