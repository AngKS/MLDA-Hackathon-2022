const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// const app = express();
const server = http.createServer();
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});

// app.use(cors());
// app.use(router);

io.on('connect', (socket) => {
    console.log(socket.data)
    socket.on('join', ({ name, mood }, callback) => {
        if (name == undefined || mood == undefined) {
            socket.emit('error', "Username and Mood are required.")
            return callback("Username and Mood are required.")
        }
        const { error, user } = addUser({ id: socket.id, name, mood });

        if (error) return callback(error);
        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`, room: user.room });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });


    socket.on('end', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })

});

server.listen(process.env.PORT || 8080, () => console.log(`Server has started.`));


