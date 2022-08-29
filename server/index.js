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

//gets all products
app.get('/products', (req, res) => {
  axios.get(`${process.env.API}/products`, {
    headers: {
      'Authorization': process.env.AUTH_CODE
    }
  }).then(response => {
    res.status(200);
    res.send(response.data);
  }).catch(err => {
    console.log(err)
    res.sendStatus(404);
  })
});


//gets all reviews for item
app.get('/reviews', (req, res) => {
  var idNum = req.params.product_id;
  axios.get(`${process.env.API}/reviews/`, {
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

//gets all meta review info for item
app.get('/reviews/meta', (req, res) => {
  var idNum = req.params.product_id;
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

app.get('/qa/questions', (req, res) => {
  axios.get(`${process.env.API}qa/questions`, {
    headers: {
      Authorization: process.env.AUTH_CODE
    },
    params: {
      product_id: req.query.product_id
    }
  })
    .then((response) => {
      res.status(200);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.sendStatus(404);
    });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {

});

app.post('/qa/questions', (req, res) => {
  // console.log(req.body.params.body);
  // axios.post(`${process.env.API}qa/questions`, {
  //   params: {
  //     body: req.body.params.body,
  //     name: req.body.params.name,
  //     email: req.body.params.email,
  //     product_id: req.body.params.product_id
  //   }
  // }, {
  //   headers: {
  //     Authorization: process.env.AUTH_CODE
  //   }
  // })
  //   .then((response) => {
  //     res.sendStatus(201);
  //   })
  //   .catch((err) => {
  //     console.log(err.response.data);
  //     res.sendStatus(501);
  //   });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {

});

app.put('/qa/questions/:question_id/helpful', (req, res) => {

});

app.put('/qa/questions/:question_id/report', (req, res) => {

});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {

});

app.put('/qa/answers/:answer_id/report', (req, res) => {

});

const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);