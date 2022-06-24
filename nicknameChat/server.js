const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let messageList = [];
let roomId = 0;
let room = '';
let users = [];

const messages = {
    general:[],
    work: [],
    javascript: [],
}

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

io.on('connection', (socket) => {
    socket.on("join server", (username) => {
        const user = {
            username: username,
            id: socket.id,
        }
        users.push(user);
        io.emit('new user', `${users.id} ${users.name}`);
    })
    io.emit('new user', `${socket.id} logged in`);
    io.emit('old messages', `${messageList}`)

    socket.on("join room", (roomName, cb) =>{
        socket.join(roomName);
        cb(messages[roomName]);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        //console.log('message: ' + msg);
        socket.emit('chat message', msg);
        addToMessageList(msg)
    })

});


const addToMessageList = (message) => {
    messageList.push(message);
    console.log(messageList);
}

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

server.listen(3000, () => {
    console.log('listening on *:3000');
});

