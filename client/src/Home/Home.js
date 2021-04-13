import React from "react";
import { Link } from "react-router-dom";

import "./Home.scss";

const Home = () => {
    const [roomName, setRoomName] = React.useState("");

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    return (
        <div className="page">
            <div class="home-container">
                <h1 class="home-header">Let's Play BIP!</h1>
                <input type="text"
                       placeholder="Game Code"
                       value={roomName}
                       onChange={handleRoomNameChange}
                       className="game-code-field" />
                <Link to={`/${roomName}`} className="join-game-button">
                    Join Game
                </Link>
            </div>
        </div>
    );
};

export default Home;