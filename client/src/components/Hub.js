import React, {useState, useContext, useEffect} from 'react'
import Card from 'react-bootstrap/cjs/Card'
import Navbar from 'react-bootstrap/cjs/Navbar'
import Form from 'react-bootstrap/cjs/Form'
import FormControl from 'react-bootstrap/cjs/FormControl'
import {SocketContext} from '../App'
import CreateRoomModal from './CreateRoomModal'
import JoinRoomModal from './JoinRoomModal'

const Hub = () => {
    const [userName, setUserName] = useState('')
    const [roomName, setRoomName] = useState('')
    const [tags, setTags] = useState('')
    const [createModal, setCreateModal] = useState(false)
    const [joinModal, setJoinModal] = useState(false)
    const [rooms, setRooms] = useState([])
    const socket = useContext(SocketContext)
    const [search, setSearch] = useState('')
    const changeCreateModal = () => {
        setCreateModal(!createModal)
    }
    const changeJoinModal = () => {
        setJoinModal(!joinModal)
    }
    useEffect(() => {
        socket.emit('reqRooms')
    }, [socket])
    useEffect(() => {
        socket.on('takeRooms', (rooms) => {
            setRooms(rooms)
        })
    })
    return (
        <div className="container justify-content-center text-center flex-sm-8">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>TIC-TAC-TOE</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Enter tags..." className="mr-sm-2" onChange={(event) => {
                        setSearch(event.target.value)
                    }}/>
                </Form>
                <button type="button" className="btn btn-dark" onClick={changeCreateModal}>Create room</button>
            </Navbar>
            <div className="card-holder card-columns ">
                {
                    rooms.filter(i => i.tags.indexOf(search)!==-1).map((item, index) => {
                        return (
                            <Card style={{height:'154px', margin: '10px auto'}} key={index}>
                                <Card.Body>
                                    <Card.Title>{item.roomName}</Card.Title>
                                    <Card.Text>
                                        {item.tags}
                                    </Card.Text>
                                        <button className="btn btn btn-dark" onClick={() => {
                                            if(item.count === 2)
                                                alert('Room is full')
                                            else {
                                                setRoomName(item.roomName)
                                                changeJoinModal()
                                            }
                                        }}>
                                            Join
                                        </button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
            <JoinRoomModal/>
            <CreateRoomModal setRoomName={setRoomName}
                             setUserName={setUserName}
                             changeCreateModal={changeCreateModal}
                             createModal={createModal}
                             roomName={roomName}
                             userName={userName}
                             tags={tags}
                             setTags={setTags}
                             rooms={rooms}/>
            <JoinRoomModal setUserName={setUserName}
                           userName={userName}
                           roomName={roomName}
                           joinModal={joinModal}
                           tags={tags}
                           changeJoinModal={changeJoinModal}/>

        </div>
    )
}
export default (Hub)