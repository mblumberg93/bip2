import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Home.scss";

const Home = () => {
    const [gameCode, setGameCode] = React.useState("");
    const history = useHistory();

    const handleGameCodeChange = (event) => {
        setGameCode(event.target.value);
    };

    const handleJoinGame = () => {
        if (gameCode) {
            history.push(`/${gameCode}`);
        }
    }

    return (
        <div className="page">
            <div class="home-container">
                <h1 class="home-header">Let's Play BIP!</h1>
                <input type="text"
                       placeholder="Game Code"
                       value={gameCode}
                       onChange={handleGameCodeChange}
                       className="game-code-field" />
                <button className="join-game-button"
                        onClick={handleJoinGame}>
                    Join Game
                </button>
            </div>
        </div>
    );
};

export default Home;