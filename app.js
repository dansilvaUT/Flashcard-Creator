const express = require('express');
const app = express();


app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render("landing");
});

app.listen(8080, () => {
    console.log('Flashcard App Server Running');
});