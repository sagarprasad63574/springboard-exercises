/** Database for lunchly */

const pg = require("pg");

// const db = new pg.Client("postgresql:///lunchly");
const db = new pg.Client({
    user: 'sagarprasad63574',
    host: 'localhost',
    database: 'lunchly',
    password: 'Wizard101pirate101!',
    port: 5432,
});

db.connect();

module.exports = db;
