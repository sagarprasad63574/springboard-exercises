/** Database setup for BizTime. */
const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql:///biztime_test";
} else {
    DB_URI = "postgresql:///biztime";
}

const db = new Client({
    user: 'sagarprasad63574',
    host: 'localhost',
    database: 'biztime',
    password: 'Wizard101pirate101!',
    port: 5432,
});

// let db = new Client({
//     connectionString: DB_URI
// });

db.connect();

module.exports = db;