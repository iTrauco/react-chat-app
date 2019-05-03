const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app); // create a plain vanilla http server that uses our express app

const WebSocket = require('ws');
const wss = new WebSocket.Server({
    server,     // piggybacking on the plain http server
    path: '/chat'   // listen on only one route, allowing express to continue to listen to listen on its customer routes
});

// @ 13:58:00; approx
app.use(express.urlencoded({extended: true}));

const PORT = 31337;

// This is my database
const db = [
    'Welcome to the chat app!'
];

// 05-02 @ 13:35:11
wss.on('connection', (socket) => {
    console.log('Oh boy! A new connection');
    socket.send(JSON.stringify(db));

    socket.on('message', (data) => {
        console.log(data);
        db.push(data);

        console.log(db);
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
            }
        });
        // socket.send(data);
    })
});

// When GET request comes in, send back all messages.

app.get('/api', (req, res) => {
    res.json(db);

});

//When POST request comes in, add message to array of messages.
app.post('/api', (req, res) => {
    // what do we do here?
    console.log(req.body.message);
    db.push(req.body.message);
    res.json({
        'message': req.body.message
    })
})


server.listen(PORT,() => {
    console.log(`Now listening on port ${PORT}...`)
});