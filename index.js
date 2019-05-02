
const express = require('express');
const app = express();
// @ 13:58:00; approx
app.use(express.urlencoded({extended: true}));

const PORT = 31337;

// This is my database
const db = [
    'Welcome to the chat app!'
];

// When GET request comes in, send back all messages.

app.get('/', (req, res) => {
    res.json(db);

});

//When POST request comes in, add message to array of messages.
app.post('/', (req, res) => {
    // what do we do here?
    console.log(req.body.message);
    db.push(req.body.message);
    res.json({
        'message': req.body.message
    })
})


app.listen(PORT,() => {
    console.log(`Now listening on port ${PORT}...`)
});