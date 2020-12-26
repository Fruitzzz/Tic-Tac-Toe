import React, {useState} from 'react'
import Modal from 'react-bootstrap/cjs/Modal'
import {Link} from "react-router-dom";

const GameOver = ({winner, socket}) => {
    const handleShow = () => {
        socket.emit('removeUser')
    }
    const [wasOpened] = useState(true)
    return (
        <Modal
            backdrop="static"
            show={wasOpened && !!winner}
            onShow={handleShow}>
            <Modal.Header >
                <Modal.Title>Game is Over</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { winner !== 'Draw'? `${winner} won!` : 'Draw'}
            </Modal.Body>
            <Modal.Footer>
                <Link to={`/`}>
                <button className="btn btn-dark">
                    Close
                </button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}
export default (GameOver)