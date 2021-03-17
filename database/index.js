const { Client } = require('pg'); // uses Client from node-postgres
const client = new Client({ // similar to MySQL
  user: 'jim',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'sdc'
});

client.connect() // returns a promise
.then(() => console.log('Connected to Postgres!'))
// .then(() => client.query(...))
.catch(e => console.error(e))
.finally(() => client.end())

// QUERY FUNCTIONS HERE >>>