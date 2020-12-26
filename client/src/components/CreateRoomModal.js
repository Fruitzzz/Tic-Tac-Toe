import React, {useState} from 'react'
import FormControl from 'react-bootstrap/cjs/FormControl'
import Modal from 'react-bootstrap/cjs/Modal'
import InputGroup from 'react-bootstrap/cjs/InputGroup'
import {Link} from 'react-router-dom'
const CreateRoomModal = ({setRoomName, setUserName, changeCreateModal, roomName, userName, createModal, setTags, tags, rooms}) => {
    const [isCorrect, setCorrect] = useState(true)
    const checkRoomName = (event) => {
        const checker = rooms.find((item) => (item.roomName === event.target.value))
        checker? setCorrect(false): setCorrect(true)
        }
    return (
        <Modal show={createModal} onHide={changeCreateModal}>
            <Modal.Header>
                <Modal.Title>Create room</Modal.Title>
                <button type="button" className="close" onClick={changeCreateModal}>
                    <span aria-hidden={true}>×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Room Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Enter a Room name.."
                        aria-label="Room Name"
                        id="roomName"
                        onChange={(event) => {
                            setRoomName(event.target.value)
                            checkRoomName(event)
                        }}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>User Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Enter a name.."
                        aria-label="User Name"
                        id="userName"
                        onChange={(event) => {
                            setUserName(event.target.value)
                        }}
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Tags</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Tags.."
                        aria-label="Tags"
                        id="tags"
                        onChange={(event) => {
                            setTags(event.target.value)
                        }}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn btn-dark" onClick={changeCreateModal}>
                    Close
                </button>
                <Link onClick={event => !roomName? event.preventDefault() : null} to={`/game?name=${userName}&room=${roomName}&type=create&tags=${tags.trim()}`}>
                    <button className="btn btn btn-dark" disabled={!(isCorrect && userName)}>
                        Create
                    </button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}
export default (CreateRoomModal)