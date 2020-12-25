
const initState = {
    field:
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
    currentTurn: '',
    winner: '',
    canTurn: null
}


const boardReducer = (state = initState, action) => {
    switch (action.type) {
        case 'makeTurn': {
            const {row, col} = action.payload
            const newState = {...state}
            if (!newState.field[row][col])
                newState.field[row][col] = newState.currentTurn
            return newState
        }
        case 'switchTurn': {
            const newState = {...state}
            if (newState.currentTurn === '✕')
                newState.currentTurn = 'O'
            else
                newState.currentTurn = '✕'
            return newState
        }
        case 'checkWinner': {
            const field = [...state.field[0].concat(...state.field[1]).concat(...state.field[2])]
            if ((field[0] === field[1] && field[0] === field[2] && field[0] !== '') || (field[3] === field[4] && field[3] === field[5] && field[3] !== '')
                || (field[6] === field[7] && field[6] === field[8] && field[6] !== '') || (field[0] === field[3] && field[0] === field[6] && field[0] !== '')
                || (field[2] === field[5] && field[2] === field[8] && field[2] !== '') || (field[1] === field[4] && field[1] === field[7] && field[1] !== '')
                || (field[0] === field[4] && field[0] === field[8] && field[0] !== '') || (field[2] === field[4] && field[2] === field[6] && field[2] !== '')) {
                const newState = {...state, winner: state.currentTurn}
                return newState
            }
            return state
        }
        case 'addUser': {
            const newState = {...state, users: action.payload}
            return newState
        }
        case 'setSymbol' : {
            const newState = {...state, currentTurn: action.payload}
            return newState
        }
        case 'setField': {
            const newState = {...state, field: action.payload}
            return newState
        }
        case 'setTurn' : {
            const newState = {...state, canTurn: action.payload}
            console.log(newState)
            return newState
        }
        default: {
            return state
        }
    }
}
export default boardReducer