const express  = require('express')
const http = require('http')
const socketIo = require('socket.io')
const {v4 : uuidv4} = require('uuid')



const app  = express()
const server = http.createServer(app)
const io = socketIo(server)


// store connected users
const connectedUsers = {};

io.on('connection', (socket) => {
    console.log('user connecteed');

    // assign unique id to user
    const userId = uuidv4();
    connectedUsers[userId] = true;

    // handle code changes
    socket.on('codeChange', (data) => {
        // broadcast code change to all users except the sender
        socket.broadcast.emit('codeChange', data);
    });

    // handle disconnecttion
    socket.on('disconnect', () => {
        console.log('user disconneted')
        delete connectedUsers[userId];

        //broadcast connected users to all users
        io.emit('connectedUSers', Object.keys(connectedUsers));
    })
})

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})