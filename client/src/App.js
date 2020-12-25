import React, {createContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Hub from './components/Hub'
import PlayRoom from './components/PlayRoom'
import io from "socket.io-client";
const ENDPOINT = 'localhost:5000'
const socket = io(ENDPOINT)
export const SocketContext = createContext(socket)

function App() {
    return (
        <Router>
            <Route path="/" exact component={Hub}/>
            <Route path="/game" component={PlayRoom}/>
        </Router>
    )
}

export default App;
