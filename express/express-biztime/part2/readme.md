### I had a problem connecting my postgresql database to work with Ubuntu.
- On db.js file the following code does not work for me. 
```js
if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql:///biztime_test";
} else {
    DB_URI = "postgresql:///biztime";
}
let db = new Client({
    connectionString: DB_URI
});
```
- I believe the problem is that I'm using a Windows machine and on Ubuntu. So I went to read the docs for node-postgresql and I found that I need run the following code in order to connect my database on Ubuntu. 
```js
if (process.env.NODE_ENV === "test") {
    DB_URI = 'biztime_test';
} else {
    DB_URI = 'biztime';
}

const db = new pg.Client({
    user: 'sagarprasad63574',
    host: 'localhost',
    database: 'lunchly',
    password: '',
    port: 5432,
});
```
