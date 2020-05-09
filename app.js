const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
//require routes
const indexRoute = require('./routes');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const cardRoute = require('./routes/cards');
const app = express();

//Connect to DB
mongoose.connect("mongodb://localhost:27017/flashcardflashstudy", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use('/public', express.static('public'));

app.set('view engine', 'pug');

//call routes
app.use(indexRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/cards', cardRoute);

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

app.listen(8080, () => console.log('Flashcard server running on port 8080'));

module.exports = app;