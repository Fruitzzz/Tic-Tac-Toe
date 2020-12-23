import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import GameBoard from './components/GameBoard'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Hub from './components/Hub'
function App() {
    return (
        <Router>
            <Route path="/" exact component={Hub}/>
            <Route path="/game" component={GameBoard}/>
        </Router>
    )
}

export default App;
