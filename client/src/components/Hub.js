import React from 'react'
import Card from 'react-bootstrap/cjs/Card'
import Button from 'react-bootstrap/cjs/Button'
import Navbar from 'react-bootstrap/cjs/Navbar'
import Form from 'react-bootstrap/cjs/Form'
import FormControl from 'react-bootstrap/cjs/FormControl'
import Modal from 'react-bootstrap/cjs/Modal'
import InputGroup from 'react-bootstrap/cjs/InputGroup'
import {bindActionCreators} from 'redux'
import * as actions from '../reducers/actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const Hub = ({modalIsOpen, openModal, roomName, setRoomName, setUserName, userName}) => {
    return (
        <div className="container justify-content-center text-center">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>TIC-TAC-TOE</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Enter tags" className="mr-sm-2"/>
                    <button type="button" className="btn btn-dark">Search</button>
                </Form>
                <button type="button" className="btn btn-dark" onClick={openModal}>Create room</button>
            </Navbar>
            <div className="card-holder">
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Tags: Blood
                        </Card.Text>
                        <Button variant="dark">Join</Button>
                    </Card.Body>
                </Card>
            </div>
            <Modal show={modalIsOpen} onHide={openModal}>
                <Modal.Header>
                    <Modal.Title>Create room</Modal.Title>
                    <button type="button" className="close" onClick={openModal}>
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
                            }}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>User Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Enter a Room name.."
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
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn btn-dark" onClick={openModal}>
                        Close
                    </button>
                    <Link onClick={event => !roomName? event.preventDefault() : null} to={`/game?name=${userName}&room=${roomName}`}>
                        <button className="btn btn btn-dark">
                            Create
                        </button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        modalIsOpen: state.userReducer.modalIsOpen,
        roomName: state.userReducer.roomName,
        userName: state.userReducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    const {openModal, setRoomName, setUserName} = bindActionCreators(actions, dispatch)
    return {openModal, setRoomName, setUserName}
}
export default connect(mapStateToProps, mapDispatchToProps)(Hub)