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

// Get X products
const getProducts = () => {

};

// Get a specific product
const getOneProduct = () => {
  console.log('One product from the DB!');
};

// Get styles for a product ID
const getStyles = () => {
  console.log('Styles from the DB!');
};

// Get related product IDs for a product ID
const getRelatedProducts = () => {
  console.log('Related products from the DB!')
};

module.exports = {
  getProducts,
  getOneProduct,
  getStyles,
  getRelatedProducts
}
