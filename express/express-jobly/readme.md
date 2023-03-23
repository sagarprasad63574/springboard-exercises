# Jobly Backend

This is the Express backend for Jobly, version 2.

To run this:

    node server.js
    
To run the tests:

    jest -i

# I had a problem connecting my postgresql database to work with Ubuntu.
- On db.js file the following code does not work for me. 
```js
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    });
    db = new Client({
        connectionString: getDatabaseUri()
     });
```
and on config.js file
```js
    function getDatabaseUri() {
        return (process.env.NODE_ENV === "test")
            ? "postgresql:///jobly_test"
            : process.env.DATABASE_URL || "postgresql:///jobly";
    }
```
- I believe the problem is that I'm using a Windows machine and on Ubuntu. So I went to read the docs for node-postgresql and I found that I need run the following code in order to connect my database on Ubuntu. 
```js
    if (process.env.NODE_ENV === "production") {
        db = new Client({
            user: 'sagarprasad63574',
            host: 'localhost',
            database: getDatabaseUri(),
            password: '',
            port: 5432,
        });
    } else {
        db = new Client({
            user: 'sagarprasad63574',
            host: 'localhost',
            database: getDatabaseUri(),
            password: '',
            port: 5432,
        });
    }
```
```js
    function getDatabaseUri() {
        return (process.env.NODE_ENV === "test")
            ? "jobly_test"
            : process.env.DATABASE_URL || "jobly";
    }
```
