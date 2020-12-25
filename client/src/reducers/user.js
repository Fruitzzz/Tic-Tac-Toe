const initState = {
    modalIsOpen: false,
    roomName: '',
    userName: '',
    socket: null
}
const userReducer = (state = initState, action) => {
    switch (action.type) {

        case 'openModal': {
            const newState = {...state, modalIsOpen: !state.modalIsOpen}
            return newState
        }
        case 'setRoomName': {
            const newState = {...state, roomName: action.payload}
            return newState
        }
        case 'setUserName': {
            const newState = {...state, userName: action.payload}
            return newState
        }
        case 'getUrlParams': {
            const newState = {...state, userName: action.payload[0], roomName: action.payload[1]}
            return newState
        }
        case 'exitRoom' : {
            return initState
        }
        case 'setSocket' : {
            const newState = {...state, socket: action.payload}
            return newState
        }
        default: {
            return state
        }
    }
}
export default userReducer