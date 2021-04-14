import { useState } from "react"
import "./Game.scss"
import useGame from "../useGame"
import { STANDARD, OPPONENT_STANDARD } from "../formations"
import Square from "../Square/Square"

const Game = (props) => {
    const { gameCode } = props.match.params
    const { updates, sendUpdate } = useGame(gameCode)
    const [ cups, setCups] = useState(STANDARD.cups)
    const [ opponentCups, setOpponentCups ] = useState(OPPONENT_STANDARD.cups)

    const getCup = (row, column, someCups) => {
        for (let cup of someCups){
            if (cup.row === row && cup.column === column) {
                return cup
            }
        }
        return null
    }

    const toggleCup = (row, column, someCups) => {
        let newCups = Array.from(someCups)
        for (let cup of newCups){
            if (cup.row === row && cup.column === column) {
                cup.active = !cup.active
            }
        }
        setCups([...newCups])
    }

    return (
        <div className="page">
            <div className="table">
                <div className="rack">
                    <div className="formation">
                        {[...Array(7).keys()].map((row) =>
                            <div className="row" 
                                 key={"row" + row}
                                 id={"row" + row}>
                                {[...Array(7).keys()].map((column) =>
                                    <Square key={"square" + row + column}
                                            cup={getCup(row, column, cups)}
                                            row={row}
                                            column={column}
                                            onToggle={(row, column) => toggleCup(row, column, cups)}
                                            opponent={false}>
                                    </Square>   
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="spacer"></div>
                <div className="rack">
                    <div className="opponent-formation">
                        {[...Array(7).keys()].reverse().map((row) =>
                            <div className="row" 
                                 key={"opponentrow" + row}
                                 id={"opponentrow" + row}>
                                {[...Array(7).keys()].map((column) =>
                                    <Square key={"opponentsquare" + row + column} 
                                            cup={getCup(row, column, opponentCups)}
                                            row={row}
                                            column={column}
                                            opponent={true}>
                                    </Square>   
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game