### I had a problem connecting my postgresql database to work with Ubuntu.
- On db.js file the following code does not work for me. 
```js
const client = new Client(DB_URI);
```
and on config.jd file
```js
```
- I believe the problem is that I'm using a Windows machine and on Ubuntu. So I went to read the docs for node-postgresql and I found that I need run the following code in order to connect my database on Ubuntu. 
```js
const db = new pg.Client({
    user: 'sagarprasad63574',
    host: 'localhost',
    database: 'lunchly',
    password: '',
    port: 5432,
});
```
