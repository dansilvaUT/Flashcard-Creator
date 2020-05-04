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
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

//call routes
app.use(indexRoute);
app.use('/cards', cardRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

//middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

//create server
app.listen(8080, () => {
    console.log('Flashcard App Server Running');
});