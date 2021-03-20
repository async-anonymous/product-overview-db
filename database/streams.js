const { Client } = require('pg');
const parse = require('csv-parse');
const fs = require('fs');

const client = new Client({
  user: 'jim',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'sdc'
});

// replace first then create csv

// Replaces Ex: 'You've' with 'You\'ve'
const find = (/(.)'(.)/gm);
const replace = (`$1\'\'$2`);

// COMPLETE: products, features, related, styles

// STYLES
client.connect()
.then(() => console.log('Connected to Postgres!'))
.then(() => {
  fs.createReadStream('database/data/styles.csv')
  .pipe(parse())
  .on('data', (row) => {
    const find = (/(.)'(.)/gm);
    const replace = (`$1\'\'$2`);
    const row2 = row[2].replace(find, replace);
    client.query(`INSERT INTO styles (id, productId, name, sale_price, original_price,default_style) VALUES ('${row[0]}', '${row[1]}', '${row2}', ${row[3]}, '${row[4]}', '${row[5]}')`, (err, result) => {
      err ? console.log(err) : null;
    })
  })
  .on('end', () => {
    console.log('Test uploaded!')
  })
})
.catch(e => console.error(e))

/*
// FEATURES
client.connect()
.then(() => console.log('Connected to Postgres!'))
.then(() => {
  fs.createReadStream('database/data/features.csv')
  .pipe(parse())
  .on('data', (row) => {
    const row2 = row[2].replace(find, replace);
    const row3 = row[3].replace(find, replace);
    client.query(`INSERT INTO features (id, productId, name, value) VALUES ('${row[0]}', '${row[1]}', '${row2}', '${row3}')`, (err, result) => {
      err ? console.log(err) : console.log(row[0], ' inserted!');
    })
  })
  .on('end', () => {
    console.log('CSV uploaded!')
  })
})
.catch(e => console.error(e))

// PRODUCTS
client.connect()
.then(() => console.log('Connected to Postgres!'))
.then(() => {
  fs.createReadStream('database/data/product.csv')
  .pipe(parse())
  .on('data', (row) => {
    const row1 = row[1].replace(find, replace);
    const row2 = row[2].replace(find, replace);
    const row3 = row[3].replace(find, replace);
    const row4 = row[4].replace(find, replace);
    client.query(`INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ('${row[0]}', '${row1}', '${row2}', '${row3}', '${row4}', '${row[5]}')`, (err, result) => {
      err ? console.log(err) : console.log(row[0], ' inserted!');
    })
  })
  .on('end', () => {
    console.log('CSV uploaded!')
  })
})
.catch(e => console.error(e))

// RELATED PRODUCTS
client.connect()
.then(() => console.log('Connected to Postgres!'))
.then(() => {
  fs.createReadStream('database/data/related.csv')
  .pipe(parse())
  .on('data', (row) => {
    client.query(`INSERT INTO related (id, current_product_id, related_product_id) VALUES ('${row[0]}', '${row[1]}', '${row[2]}')`, (err, result) => {
      err ? console.log(err) : console.log(row[0], ' inserted!');
    })
  })
  .on('end', () => {
    console.log('CSV uploaded!')
  })
})
.catch(e => console.error(e))
*/