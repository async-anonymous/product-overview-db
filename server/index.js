const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');
require('../database/index.js');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});

// ROUTERS

// Get specific product
app.get('/products/:product_id', (req, res) => {
  db.getOneProduct(req.params.product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const productData = data[0];
      const featureArray = [];
      for (let obj of data) {
        featureArray.push({feature: obj.featurename, value: obj.value})
      }
      const product = {
        category: productData.category,
        default_price: productData.default_price.toFixed(2),
        description: productData.description,
        id: req.params.id,
        name: productData.productname,
        slogan: productData.slogan,
        features: featureArray
      }
      res.send(product);
    }
  });
});

// Get all styles for a specific product
app.get('/products/:product_id/styles', (req, res) => {
  db.getStyles(req.params.product_id, (err, data) => {
    err ? (console.log(err), res.sendStatus(500)) : res.send(data);
  });
});

// Get all related products of a specific product
app.get('/products/:product_id/related', (req, res) => {
  db.getRelatedProducts(req.params.product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const dataArray = [];
      for (let relatedObj of data) {
        dataArray.push(relatedObj['related_product_id']);
      }
      res.send(dataArray);
    }
  });
});