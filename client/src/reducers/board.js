const initState = {
    field:
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
    currentTurn: '✕',
    winner: ''
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
        default: {
            return state
        }
    }
}
export default boardReducer