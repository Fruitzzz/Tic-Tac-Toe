import React, {useState} from 'react'
import Modal from 'react-bootstrap/cjs/Modal'
import {Link} from "react-router-dom";

const GameOver = ({winner, socket}) => {
    const handleClose = () => {
        socket.emit('disconnect')
        socket.close()
    }
    const [wasOpened] = useState(true)
    return (
        <Modal
            backdrop="static"
            show={wasOpened && !!winner}>
            <Modal.Header >
                <Modal.Title>Game is Over</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`${winner} won!`}
            </Modal.Body>
            <Modal.Footer>
                <Link to={`/`}>
                <button className="btn btn-dark" onClick={handleClose}>
                    Close
                </button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}
export default (GameOver)