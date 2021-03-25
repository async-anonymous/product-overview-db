const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'ec2-3-132-102-200.us-east-2.compute.amazonaws.com',
  port: 5432,
  database: 'sdc'
});

client.connect()
.then(() => console.log('Connected to Postgres!'))
.catch(e => console.error(e))

const getOneProduct = (id, callback) => {
  client.query(`SELECT * FROM products p LEFT OUTER JOIN features f ON p.id = f.productId WHERE p.id = ${id}`, (err, results) => {
    err ? callback(err) : callback(null, results.rows);
  })
};

const getStyles = (id, callback) => {
  client.query(`SELECT id, sale_price, original_price, default_style, name, photos, skus FROM stylesplus WHERE productId = ${id}`, (err, results) => {
    err ? callback(err) : callback(null, results.rows);
  })
};

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
