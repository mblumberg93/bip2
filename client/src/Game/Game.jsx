import { useState } from "react"
import "./Game.scss"
import useGame from "../useGame"
import { STANDARD, OPPONENT_STANDARD, FORMATIONS } from "../formations"
import Square from "../Square/Square"

const Game = (props) => {
    const { gameCode } = props.match.params
    const { updates, sendUpdate } = useGame(gameCode)
    const [ cups, setCups] = useState(STANDARD.cups)
    const [ opponentCups, setOpponentCups ] = useState(OPPONENT_STANDARD.cups)
    const [ reracking, setReracking] = useState(false)

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

    const toggleReracking = () => {
        setReracking(!reracking)
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
                <button className={"formation-change" + (reracking ? " hidden" : "")} 
                        onClick={toggleReracking}>Rerack</button>
                <div className={"formation-container" + (reracking ? "" : " invisible")}>
                    <select className={"formation-select" + (reracking ? "" : " hidden")}
                            onChange={toggleReracking}>
                        { [...FORMATIONS].map((form) => 
                            <option key={"formation" + form.value}
                                    value={form.value}>
                                {form.name}
                            </option>
                        )}
                    </select>
                </div>
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