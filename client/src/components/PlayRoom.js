import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import Navbar from 'react-bootstrap/cjs/Navbar'
import {Link} from 'react-router-dom'
import queryString from 'querystring'
import GameBoard from './GameBoard'

const ENDPOINT = 'localhost:5000'
let socket

const PlayRoom = () => {
    const [userName, setUserName] = useState('')
    const [roomName, setRoomName] = useState('')
    const [field, setField] = useState( [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ])
    const [winner, setWinner] = useState('')
    const [turn, setTurn] = useState('')
    const [symbol, setSymbol] = useState('')

    const updateField = ({row, col}) => {
        const newField = field
        if(!field[row][col]) {
            newField[row][col] = symbol
            socket.emit('sendField', (newField))
        }
    }
    const updateTurn = () => {
        socket.emit('swapTurn')
    }
    const checkWinner = () => {
        const tempField = [...field[0].concat(...field[1]).concat(...field[2])]
        if ((tempField[0] === tempField[1] && tempField[0] === tempField[2] && tempField[0] !== '') || (tempField[3] === tempField[4] && tempField[3] === tempField[5] && tempField[3] !== '')
            || (tempField[6] === tempField[7] && tempField[6] === tempField[8] && tempField[6] !== '') || (tempField[0] === tempField[3] && tempField[0] === tempField[6] && tempField[0] !== '')
            || (tempField[2] === tempField[5] && tempField[2] === tempField[8] && tempField[2] !== '') || (tempField[1] === tempField[4] && tempField[1] === tempField[7] && tempField[1] !== '')
            || (tempField[0] === tempField[4] && tempField[0] === tempField[8] && tempField[0] !== '') || (tempField[2] === tempField[4] && tempField[2] === tempField[6] && tempField[2] !== '')) {
            setWinner(symbol)
        }
    }
    useEffect(() => {
        const data = Object.values(queryString.parse(window.location.search))
        socket = io(ENDPOINT)
        setUserName(data[0].toString())
        setRoomName(data[1].toString())
        socket.emit('join', {name: userName, roomName}, (error) => {
            if(error) {
                alert(error)
            }
        })
        socket.on('start', ({turn, symbol}) => {
            setTurn(turn)
            setSymbol(symbol)
        })
    }, [roomName, userName])
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
    return (
        <div className="container justify-content-center text-center">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>{roomName}</Navbar.Brand>
                <Link to={'/'} onClick={() => {

                }}>
                    <button type="button" className="btn btn-dark">Leave</button>
                </Link>
            </Navbar>
            <GameBoard field={field} symbol={symbol} turn={turn} winner={winner} updateField={updateField} updateTurn={updateTurn}/>
        </div>
    )
}

export default PlayRoom