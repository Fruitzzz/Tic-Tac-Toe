import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../reducers/actions'
import Table from 'react-bootstrap/cjs/Table'


const GameBoard = ({field, makeTurn, checkWinner, winner, socket, setSymbol, canTurn, currentTurn, setField, setTurn}) => {
    const sendField = () => {
        socket.emit('sendField', {field})
    }
    useEffect(() => {
        if(socket) {
            socket.on('takeField', (field) => {
                try {
                    console.log(field)
                    setField(field)
                   // socket.emit('swapTurns', {})
                    //socket.on('takeTurns', ({canTurn}) => {
                     //   setTurn(!canTurn)
                   // })
                }
                catch (e) {
                    alert(e.message)
                }
            })

        }
    }, [socket, setField])
    useEffect(() => {

        if(!currentTurn && socket) {
            socket.emit('requestStartProps')
            socket.on('takeStartProps', ({turn}) => {
                setSymbol(turn)
            })
        }
    }, [socket, setSymbol, currentTurn])
    return (
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
                                        if (!field[row][col] && !winner && canTurn) {
                                            makeTurn({row, col})
                                            checkWinner()
                                            sendField()
                                        }
                                    }}>{field[row][col]}</td>
                                })}
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
    )
}
const mapStateToProps = (state) => {
    return {
        field: state.boardReducer.field,
        currentTurn: state.boardReducer.currentTurn,
        winner: state.boardReducer.winner,
        socket: state.userReducer.socket,
        canTurn: state.boardReducer.canTurn
    }
}
const mapDispatchToProps = (dispatch) => {
    const {makeTurn, switchTurn, checkWinner, setSymbol, setField, setTurn} = bindActionCreators(actions, dispatch)
    return {makeTurn, switchTurn, checkWinner, setSymbol, setField, setTurn}
}
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)