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
    socket.on('enter', ({name, roomName, tags}, callback) => {
        const firstUser = users.find((item) => item.room === roomName)
        const {error, user} = addUser({id: socket.id, name, room: roomName, tags})
        if (firstUser && user) {
            user.symbol = firstUser.symbol === 'O'? '✕' : 'O'
            user.turn = firstUser.turn
            user.field = firstUser.field
        }
        const rooms = createRooms()
        if (user) {
            socket.join(user.room)
            io.to(user.id).emit('created', {turn: user.turn, symbol: user.symbol, field: user.field})
            io.to(user.id).emit('joined', {turn: user.turn, symbol: user.symbol, field: user.field})
            socket.broadcast.emit('takeRooms', rooms)
        }
    })

    socket.on('reqRooms', () => {
        const rooms = createRooms()
        if(rooms)
            io.sockets.emit('takeRooms', rooms)
    })

    socket.on('swapTurn', () => {
        const user = getUser(socket.id)
        users.forEach((item) => {
            if (item.room === user.room) {
                item.turn === '✕' ? item.turn = 'O' : item.turn = '✕'
            }
        })

        io.to(user.room).emit('takeTurn', {turn: user.turn})
    })


    socket.on('sendField', (field) => {
        const firstUser = getUser(socket.id)
        const secondUser = users.find((item) => item.room === firstUser.room)
        if(secondUser)
            secondUser.field = field
        firstUser.field = field
        io.to(firstUser.room).emit('takeField', field)
    })


    socket.on('checkWinner', (field) => {
        const tempField = [...field[0].concat(...field[1]).concat(...field[2])]
        const user = getUser(socket.id)
        if ((tempField[0] === tempField[1] && tempField[0] === tempField[2] && tempField[0] !== '') || (tempField[3] === tempField[4] && tempField[3] === tempField[5] && tempField[3] !== '')
            || (tempField[6] === tempField[7] && tempField[6] === tempField[8] && tempField[6] !== '') || (tempField[0] === tempField[3] && tempField[0] === tempField[6] && tempField[0] !== '')
            || (tempField[2] === tempField[5] && tempField[2] === tempField[8] && tempField[2] !== '') || (tempField[1] === tempField[4] && tempField[1] === tempField[7] && tempField[1] !== '')
            || (tempField[0] === tempField[4] && tempField[0] === tempField[8] && tempField[0] !== '') || (tempField[2] === tempField[4] && tempField[2] === tempField[6] && tempField[2] !== ''))
            io.to(user.room).emit('takeWinner', {win: user.turn})
        if((tempField[0]) && tempField[1] && tempField[2] && tempField[3] && tempField[4] && tempField[5] && tempField[6] && tempField[7] && tempField[8])
            io.to(user.room).emit('takeWinner', {win: 'Draw'})
    })
    socket.on('disconnect', () => {
         removeUser(socket.id)
        const rooms = createRooms()
        if(rooms)
            io.sockets.emit('takeRooms', rooms)
    })
    socket.on('removeUser', () => {
        removeUser(socket.id)
        const rooms = createRooms()
        if(rooms)
            io.sockets.emit('takeRooms', rooms)
    })
})
const createRooms = () => {
    const rooms = []
    const temp = users.map(item => ({userName: item.name, roomName: item.room, tags: item.tags})).sort((a, b) => {
        if (a.roomName > b.roomName)
            return 1
        if (a.roomName < b.roomName)
            return -1
        return 0
    })
    temp.forEach((item) => {
        let index = rooms.findIndex((el) => el.roomName === item.roomName)
        if(index !== -1)
            rooms[index].count = 2
        else
            rooms.push({roomName: item.roomName, tags: item.tags, count: 1})
    })
    return rooms
}

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`))