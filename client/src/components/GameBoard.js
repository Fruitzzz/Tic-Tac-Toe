import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../reducers/actions'
import Table from 'react-bootstrap/cjs/Table'
import io from 'socket.io-client'

let socket


const GameBoard = ({field, makeTurn, switchTurn, checkWinner, winner, userName, roomName}) => {
    const ENDPOINT = 'localhost:5000'
    useEffect(() => {
        socket = io(ENDPOINT)
        console.log(socket)
    }, [ENDPOINT])
    return (
        <div className="container justify-content-center text-center">
            <Table className="table-bordered">
                <tbody>
                {
                    field.map((item, row) => {
                        return (
                            <tr key={row}>
                                {item.map((el, col) => {
                                    return <td
                                        className={field[row][col] === '✕' ? 'field-cell cross' : field[row][col] === 'O' ? 'field-cell zero' : 'field-cell'}
                                        key={col} onClick={() => {
                                        if (!field[row][col] && !winner) {
                                            makeTurn({row, col})
                                            checkWinner()
                                            switchTurn()
                                        }
                                    }}>{field[row][col]}</td>
                                })}
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        field: state.boardReducer.field,
        currentTurn: state.boardReducer.currentTurn,
        winner: state.boardReducer.winner,
        userName: state.userReducer.userName,
        roomName: state.userReducer.roomName
    }
}
const mapDispatchToProps = (dispatch) => {
    const {makeTurn, switchTurn, checkWinner} = bindActionCreators(actions, dispatch)
    return {makeTurn, switchTurn, checkWinner}
}
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)