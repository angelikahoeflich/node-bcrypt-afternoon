require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const {CONNECTION_STRING, SESSION_SECRET} = process.env;

const port = 4000;
const app = express();


massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db);
  console.log('db connected')
});


app.use(express.json());

app.use(
  session({
  resave: true,
  saveUninitialized: false,
  secret: SESSION_SECRET
})
);


app.listen(port, console.log(`listening on port ${port}`))

