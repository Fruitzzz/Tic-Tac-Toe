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
            io.to(user.id).emit('start', {turn : user.turn, symbol: user.symbol})
        }

        socket.on ('swapTurn', () => {
                const user = getUser(socket.id)
                users.forEach((item) => {
                    if (item.room === user.room) {
                        item.turn === '✕'? item.turn = 'O': item.turn = '✕'
                        console.log(item)
                    }
                })
                io.to(user.room).emit('takeTurn', {turn: user.turn})
        })
        socket.on('sendField', (field) => {
            console.log(field)
            const user = getUser(socket.id)
            io.to(user.room).emit('takeField', field)
        })

        socket.on('disconnect', () => {
            removeUser(socket.id)
        })
    })
})
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`))