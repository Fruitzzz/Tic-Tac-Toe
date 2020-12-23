import {combineReducers} from 'redux'
import boardReducer from './board'
import userReducer from './user'

export default combineReducers({
    boardReducer,
    userReducer
})