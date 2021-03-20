const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');
require('../database/index.js');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

// Hello World
app.get('/', (req, res) => {
  res.sendStatus(200);
  console.log('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});

// ROUTERS

// Get all products (takes in count in params)
app.get('/products', (req, res) => {
  res.sendStatus(200);
  console.log('Get products!');
});

// Get specific product
app.get('/products/:product_id', (req, res) => {
  db.getOneProduct((err, data) => {
    err ? (console.log(err), res.sendStatus(500)) : res.sendStatus(200);
  });
});

// Get all styles for a specific product
app.get('/products/:product_id/styles', (req, res) => {
  db.getStyles((err, data) => {
    err ? (console.log(err), res.sendStatus(500)) : res.sendStatus(200);
  });
});

// Get all related products of a specific product
app.get('/products/:product_id/related', (req, res) => {
  db.getRelatedProducts((err, data) => {
    err ? (console.log(err), res.sendStatus(500)) : res.sendStatus(200);
  });
});