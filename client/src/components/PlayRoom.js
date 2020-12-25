import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../reducers/actions'
import io from 'socket.io-client'
import Navbar from 'react-bootstrap/cjs/Navbar'
import {Link} from 'react-router-dom'
import queryString from 'querystring'
import GameBoard from './GameBoard'

let socket
const PlayRoom = ({exitRoom, userName, roomName, getUrlParams, setSocket}) => {
    const ENDPOINT = 'localhost:5000'
    useEffect(() => {
        socket = io(ENDPOINT)
        setSocket(socket)
        return () => {
            socket.emit('disconnect')
            exitRoom()
            socket.off()
        }
    }, [ENDPOINT, exitRoom, setSocket])
    useEffect( () => {
        const data = Object.values(queryString.parse(window.location.search))
        getUrlParams([data[0], data[1]])
        socket.emit('join', {name : userName, roomName})
    }, [getUrlParams, userName, roomName])
    return (
        <div className="container justify-content-center text-center">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>{roomName}</Navbar.Brand>
                <Link to={'/'} onClick={() => {

                }}>
                    <button type="button" className="btn btn-dark">Leave</button>
                </Link>
            </Navbar>
            <GameBoard/>
        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        userName: state.userReducer.userName,
        roomName: state.userReducer.roomName,
        socket: state.userReducer.socket
    }
}
const mapDispatchToProps = (dispatch) => {
    const {exitRoom, getUrlParams, addUser, makeTurn, setSocket} = bindActionCreators(actions, dispatch)
    return {exitRoom, getUrlParams, addUser, makeTurn, setSocket}
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayRoom)