require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const port = 4000;
const app = express();

app.use(express.json());


app.listen(port, console.log(`listening on port ${port}`))
