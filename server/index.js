// require("dotenv") require the dotenv package that was installed
// .config() calls the config method of the dotenv package, and allows access to the process.env variables located in .env
require("dotenv").config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

//middleware
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

//requests

//gets all data for one product
app.get('/products/item', (req, res) => {
  var productId = req.query.product_id;
  console.log(productId);
  axios.get(`${process.env.API}/products/${productId}`, {
    headers: {
      'Authorization': process.env.AUTH_CODE
    }
  }).then(response => {
    res.status(200);
    console.log(response.data);
    res.send(response.data);
  }).catch(err => {
    console.log(err)
    res.sendStatus(404);
  })
});

//gets related items for one product
app.get('/products/relatedlist', (req, res) => {
  var productId = req.query.product_id;
  console.log(productId);
  axios.get(`${process.env.API}/products/${productId}/related`, {
    headers: {
      'Authorization': process.env.AUTH_CODE
    },
    params: {
      product_id: productId
    }
  }).then(response => {
    res.status(200);
    console.log(response.data);
    res.send(response.data);
  }).catch(err => {
    console.log(err)
    res.sendStatus(404);
  })
});

//gets all reviews for item
app.get('/reviews', (req, res) => {
  var idNum = req.query.product_id;
  var count = req.query.count;
  axios.get(`${process.env.API}/reviews/`, {
    headers: {
      'Authorization': process.env.AUTH_CODE
    },
    params: {
      product_id: idNum,
      count: count
    }
  }).then(response => {
    res.status(200);
    res.send(response.data);
  }).catch(err => {
    console.log(err)
    res.sendStatus(404);
  })
});

//gets all meta review info for item
app.get('/reviews/meta', (req, res) => {
  var idNum = req.query.product_id;
  axios.get(`${process.env.API}/reviews/meta`, {
    headers: {
      'Authorization': process.env.AUTH_CODE
    },
    params: { product_id: idNum }
  }).then(response => {
    res.status(200);
    res.send(response.data);
  }).catch(err => {
    console.log(err)
    res.sendStatus(404);
  })
});


const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);