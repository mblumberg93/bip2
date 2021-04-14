import { useState } from "react"
import "./Game.scss"
import useGame from "../useGame"
import { STANDARD } from "../formations"

const Game = (props) => {
    const { gameCode } = props.match.params
    const { updates, sendUpdate } = useGame(gameCode)
    const [newUpdate, setNewUpdate] = useState("")
    const [ currentCups, setCurrentCups ] = useState(STANDARD.cups)
    const [ opponentCups, setOpponentCups ] = useState(STANDARD.cups)

    const squareClass = (row, column, cups) => {
        if (hasCup(row, column, cups)) {
            return "square cup"
        } else {
            return "square"
        }
    }

    const hasCup = (row, column, cups) => {
        for (let cup of cups){
            if (cup.row == row && cup.column == column) {
                return true
            }
        }
        return false
    }

    return (
        <div className="page">
            <div className="table">
                <div className="rack">
                    <div class="formation">
                        {[...Array(7).keys()].map((row) =>
                            <div className="row" key={"row"+row}>
                                {[...Array(7).keys()].map((column) =>
                                    <div className="square" key={"square"+row+column} >
                                        { hasCup(row, column, currentCups) &&
                                            <div className="cup" key={"cup"+row+column}></div>
                                        }
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="spacer"></div>
                <div className="rack">
                    <div class="opponent-formation">
                        {[...Array(7).keys()].reverse().map((row) =>
                            <div className="row" key={"row"+row}>
                                {[...Array(7).keys()].map((column) =>
                                    <div className="square" key={"square"+row+column} >
                                        { hasCup(row, column, currentCups) &&
                                            <div className="cup" key={"cup"+row+column}></div>
                                        }
                                    </div>
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