const express = require('express');
const path = require('path');
const cors = require('cors');
require('../database/index.js');

const app = express();
const PORT = 3000;

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
  res.sendStatus(200);
  console.log('Get this product!');
});

// Get all styles for a specific product
app.get('/products/:product_id/styles', (req, res) => {
  res.sendStatus(200);
  console.log('Get product styles!');
})

// Get all related products of a specific product
app.get('/products/:product_id/related', (req, res) => {
  res.sendStatus(200);
  console.log('Get related products!');
})