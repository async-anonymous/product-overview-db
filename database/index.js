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
.catch(e => console.error(e))
// .finally(() => client.end())

// QUERY FUNCTIONS HERE >>>

// Get a specific product
// SELECT * FROM products p WHERE id = ${id}
// SELECT * FROM products p LEFT OUTER JOIN features f ON p.id = f.productId WHERE p.id = ${id}
const getOneProduct = (id, callback) => {
  client.query(`SELECT * FROM products p LEFT OUTER JOIN features f ON p.id = f.productId WHERE p.id = ${id}`, (err, results) => {
    err ? callback(err) : callback(null, results.rows);
  })
};

// Get styles for a product ID
const getStyles = (id, callback) => {
  client.query(`SELECT * FROM styles WHERE productId = ${id}`, (err, results) => {
    err ? callback(err) : callback(null, results.rows);
  })
};

// Get related product IDs for a product ID
const getRelatedProducts = (id, callback) => {
  client.query(`SELECT related_product_id FROM related WHERE current_product_id = ${id}`, (err, results) => {
    err ? callback(err) : callback(null, results.rows);
  })
};

module.exports = {
  getOneProduct,
  getStyles,
  getRelatedProducts
}
