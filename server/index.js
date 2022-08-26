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
app.get('/reviews', (req, res) => {

});


const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);