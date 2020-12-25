import React from 'react'
import FormControl from 'react-bootstrap/cjs/FormControl'
import Modal from 'react-bootstrap/cjs/Modal'
import InputGroup from 'react-bootstrap/cjs/InputGroup'
import {Link} from 'react-router-dom'

const JoinRoomModal = ({changeJoinModal, setUserName, roomName, userName, joinModal, tags}) => {
    return (
        <Modal show={joinModal} onHide={changeJoinModal}>
            <Modal.Header>
                <Modal.Title>Create room</Modal.Title>
                <button type="button" className="close" onClick={changeJoinModal}>
                    <span aria-hidden={true}>×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>User Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Enter a name..."
                        aria-label="User Name"
                        id="userName"
                        onChange={(event) => {
                            setUserName(event.target.value)
                        }}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn btn-dark" onClick={changeJoinModal}>
                    Close
                </button>
                <Link onClick={event => !roomName? event.preventDefault() : null} to={`/game?name=${userName}&room=${roomName}&type=join&tags=${tags}`}>
                    <button className="btn btn btn-dark">
                        Create
                    </button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}
export default (JoinRoomModal)