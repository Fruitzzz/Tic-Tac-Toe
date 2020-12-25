const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { addUser, removeUser, getUser, users} = require('./users')

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(router)

io.on('connect', (socket) => {
    socket.on('join', ({name, roomName}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room: roomName})
        if(user) {
            socket.join(user.room)
        }

        socket.on ('swapTurns', () => {
                const user = getUser(socket.id)
                users.forEach((item) => {
                    if (item.room === user.room) {
                        console.log(item)
                        item.canTurn = !item.canTurn
                    }
                })
                io.to(user.id).emit('takeTurns', {canTurn: user.canTurn})
        })

        socket.on('requestStartProps', () => {
                const user = getUser(socket.id)
                io.to(user.id).emit('takeStartProps', {turn: user.turn})
        })

        socket.on('sendField', ({field}, callback) => {
            const user = getUser(socket.id)
            io.to(user.room).emit('takeField', field)
        })

        socket.on('disconnect', () => {
            removeUser(socket.id)
        })
    })
})
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`))