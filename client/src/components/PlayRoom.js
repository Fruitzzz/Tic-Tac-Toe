import React, {useEffect, useState, useContext} from 'react'
import Navbar from 'react-bootstrap/cjs/Navbar'
import {Link} from 'react-router-dom'
import queryString from 'querystring'
import GameBoard from './GameBoard'
import GameOver from './GameOver'
import {SocketContext} from '../App'


const PlayRoom = () => {
    const [userName, setUserName] = useState('')
    const [roomName, setRoomName] = useState('')
    const [tags, setTags] = useState('')
    const [field, setField] = useState( [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ])
    const [winner, setWinner] = useState('')
    const [turn, setTurn] = useState('')
    const [symbol, setSymbol] = useState('')
    const socket = useContext(SocketContext)
    const updateField = ({row, col}) => {
        const newField = field
        if(!field[row][col]) {
            newField[row][col] = symbol
            socket.emit('sendField', newField)
        }
    }
    const updateTurn = () => {
        socket.emit('swapTurn')
    }
    const checkWinner = () => {
        socket.emit('checkWinner', field)
    }
    useEffect(() => {
        const data = Object.values(queryString.parse(window.location.search))
        setUserName(data[0].toString())
        setRoomName(data[1].toString())
        setTags(data[3].toString())
        socket.emit('enter', {name: userName, roomName, tags}, (error) => {
            if(error) {
                alert(error)
            }
        })
        if(data[2].toString() === 'create') {
            socket.on('created', ({turn, symbol}) => {
                setTurn(turn)
                setSymbol(symbol)
            })
        }
        else if(data[2].toString() === 'join') {
            socket.on('joined', ({turn, symbol, field}) => {
                setTurn(turn)
                setSymbol(symbol)
                setField(field)
            })
        }
    }, [roomName, userName, socket, tags])
    useEffect(() => {
        socket.on('takeField', (field) => {
            setField(field)
        })
    })
    useEffect(() => {
        socket.on('takeTurn', ({turn}) => {
            setTurn(turn)
        })
    })
   useEffect(() => {
        socket.on('takeWinner', ({win}) => {
                setWinner(win)
        })
    })
    return (
        <div className="container justify-content-center text-center">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>{roomName}</Navbar.Brand>
                <Link onClick={() => {
                    //socket.emit('disconnect')
                }} to={'/'}>
                    <button type="button" className="btn btn-dark">Leave</button>
                </Link>
            </Navbar>
            <GameBoard field={field} symbol={symbol} turn={turn} winner={winner} updateField={updateField} updateTurn={updateTurn} checkWinner={checkWinner}/>
            <GameOver winner={winner} socket={socket}/>
        </div>
    )
}

export default PlayRoom