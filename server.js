const express  = require('express')
const http = require('http')
const socketIo = require('socket.io')
const {v4 : uuidv4} = require('uuid')
const cors = require('cors');



const app  = express()
const server = http.createServer(app)
const io = socketIo(server,{cors: {origin: "*"}})

app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     next();
//   });

// store connected users
// const connectedUsers = {};

io.on('connection', (socket) => {
    console.log('a user connecteed');

    socket.on('codeChange', (data) => {
        console.log(`recieved data from user : ${data}`)
        // broadcast code-update to all users
        io.emit('codeChange', data);
    });

    // dusconnection
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})