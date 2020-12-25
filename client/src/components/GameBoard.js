import React, {useEffect} from 'react'
import Table from 'react-bootstrap/cjs/Table'


const GameBoard = ({field, turn, symbol, winner, updateField, updateTurn}) => {
   /* const sendField = () => {
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
    }, [socket, setSymbol, currentTurn])*/
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
                                            console.log(turn, symbol)
                                        if (!field[row][col] && !winner && turn === symbol) {
                                            updateField({row, col})
                                            updateTurn()
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
export default (GameBoard)