const cors = require('cors')
const io = require('socket.io')(3000, {
    cors: {
        origin: "*"
    }
})

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })
    socket.on('send-message', message => {
        socket.broadcast.emit('message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-left', users[socket.id])
        delete users[socket.id]
    })
})

