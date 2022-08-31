// require("dotenv") require the dotenv package that was installed
// .config() calls the config method of the dotenv package, and allows access to the process.env variables located in .env
require("dotenv").config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// middleware
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

// Express routes

// gets all data for one product
app.get('/products/item', (req, res) => {
  var productId = req.query.product_id;
  axios.get(`${process.env.API}/products/${productId}`, {
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

// gets all styles for a given product
app.get('/products/styles', (req, res) => {
  var productId = req.query.product_id;
  axios.get(`${process.env.API}/products/${productId}/styles`, {
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

// gets related items for a product
app.get('/products/relatedlist', (req, res) => {
  var productId = req.query.product_id;
  axios.get(`${process.env.API}/products/${productId}/related`, {
    headers: {
      'Authorization': process.env.AUTH_CODE
    },
    params: {
      product_id: productId
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
  var idNum = req.query.product_id;
  var count = req.query.count;
  var sort = req.query.sort;
  axios.get(`${process.env.API}/reviews/`, {
    headers: {
      'Authorization': process.env.AUTH_CODE
    },
    params: {
      product_id: idNum,
      count: count,
      sort: sort
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

//increases 'Yes' vote count
app.put('/reviews/helpful', (req, res) => {
  var reviewNum = req.body.review_id;
  axios.put(`${process.env.API}/reviews/${reviewNum}/helpful`, null,
  {
    headers: {
      'Authorization': process.env.AUTH_CODE
    }
  }).then(response => {
    res.sendStatus(204);
  }).catch(err => {
    console.log(err)
    res.sendStatus(404);
  })
});

//reports review for removal
app.put('/reviews/report', (req, res) => {
  var reviewNum = req.body.review_id;
  axios.put(`${process.env.API}/reviews/${reviewNum}/report`, null,
  {
    headers: {
      'Authorization': process.env.AUTH_CODE
    }
  }).then(response => {
    res.sendStatus(204);
  }).catch(err => {
    console.log(err)
    res.sendStatus(404);
  })
});

//gets all questions for a product id
app.get('/qa/questions', (req, res) => {
  axios.get(`${process.env.API}/qa/questions`, {
    headers: {
      Authorization: process.env.AUTH_CODE
    },
    params: {
      product_id: req.query.product_id,
      count: req.query.count
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

//gets all answers for a question id
app.get('/qa/questions/:question_id/answers', (req, res) => {
  axios.get(`${process.env.API}/qa/questions/${req.query.question_id}/answers`, {
    headers: {
      Authorization: process.env.AUTH_CODE
    },
    params: {
      question_id: req.query.question_id,
      count: req.query.count
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

//posts a new question
app.post('/qa/questions', (req, res) => {
  axios.post(`${process.env.API}/qa/questions`, {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    product_id: req.body.product_id
  }, {
    headers: {
      Authorization: process.env.AUTH_CODE
    }
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.sendStatus(501);
    });
});

//posts a new answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  axios.post(`${process.env.API}/qa/questions/${req.params.question_id}/answers`, {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  }, {
    headers: {
      Authorization: process.env.AUTH_CODE
    }
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.sendStatus(501);
    });
});

//mark a question as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  axios.put(`${process.env.API}/qa/questions/${req.params.question_id}/helpful`, {
    params: {
      question_helpfulness: req.body.question_helpfulness
    }
  }, {
    headers: {
      Authorization: process.env.AUTH_CODE
    }
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.sendStatus(501);
    });
});

//report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  axios.put(`${process.env.API}/qa/questions/${req.params.question_id}/report`, null, {
    headers: {
      Authorization: process.env.AUTH_CODE
    }
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.sendStatus(501);
    });
});

//mark an answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  axios.put(`${process.env.API}/qa/answers/${req.params.answer_id}/helpful`, null, {

    headers: {
      Authorization: process.env.AUTH_CODE
    }
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.sendStatus(501);
    });
});

//report an answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  axios.put(`${process.env.API}/qa/answers/${req.params.answer_id}/report`, null, {
    headers: {
      Authorization: process.env.AUTH_CODE
    }
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.sendStatus(501);
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);