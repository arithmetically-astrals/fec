// require("dotenv") require the dotenv package that was installed
// .config() calls the config method of the dotenv package, and allows access to the process.env variables located in .env
require("dotenv").config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));

const PORT = 8080 || process.env.PORT;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);