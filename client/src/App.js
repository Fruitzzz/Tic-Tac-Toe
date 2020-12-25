import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Hub from './components/Hub'
import PlayRoom from './components/PlayRoom'
function App() {
    return (
        <Router>
            <Route path="/" exact component={Hub}/>
            <Route path="/game" component={PlayRoom}/>
        </Router>
    )
}

export default App;
