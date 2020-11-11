require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const {CONNECTION_STRING, SESSION_SECRET} = process.env;
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');

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

app.get('/auth/logout', authCtrl.logout);
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);



app.listen(port, console.log(`listening on port ${port}`))

