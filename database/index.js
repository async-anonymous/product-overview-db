const { Client } = require('pg'); // uses Client from node-postgres
const client = new Client({ // similar to MySQL
  user: 'postgres',
  password: 'postgres',
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
// SELECT * FROM styles WHERE productId = ${id}
// SELECT * FROM styles st FULL OUTER JOIN photos p ON st.id = p.styleId FULL OUTER JOIN skus sk ON st.id = sk.styleId WHERE st.id = ${id}
// SELECT id, sale_price, original_price, default_style, name, photos, skus FROM stylesplus WHERE productId = ${id}
/*
    SELECT styles.id AS id,
    styles.productId,
    styles.sale_price,
    styles.original_price,
    styles.default_style,
    styles.name,
    jsonb_agg(DISTINCT jsonb_build_object('url',photos.url,'thumbnail_url',photos.thumbnail_url)) AS photos,
    jsonb_object_agg(skus.id,(jsonb_build_object('quantity',skus.quantity,'size',skus.size))) AS skus
    FROM styles
    JOIN photos ON styles.id = photos.styleId
    JOIN skus ON styles.id = skus.styleId
    WHERE productId = ${id}
    GROUP BY styles.id
*/

// jsonb_agg(DISTINCT to_jsonb(skus)) AS skus
// jsonb_agg(DISTINCT jsonb_build_object('quantity',skus.quantity,'size',skus.size)) AS skus
const getStyles = (id, callback) => {
  client.query(`SELECT id, sale_price, original_price, default_style, name, photos, skus FROM stylesplus WHERE productId = ${id}`, (err, results) => {
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
