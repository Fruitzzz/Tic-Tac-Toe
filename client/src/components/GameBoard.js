import React from 'react'
import Table from 'react-bootstrap/cjs/Table'


const GameBoard = ({field, turn, symbol, winner, updateField, updateTurn, checkWinner}) => {
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
                                        if (!field[row][col] && !winner && turn === symbol) {
                                            updateField({row, col})
                                            checkWinner()
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