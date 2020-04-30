const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static('public'));
app.set('view engine', 'pug');

//require routes
const indexRoute = require('./routes');
const cardRoute = require('./routes/cards');

//call routes
app.use(indexRoute);
app.use('/cards', cardRoute);

//create server
app.listen(8080, () => {
    console.log('Flashcard App Server Running');
});