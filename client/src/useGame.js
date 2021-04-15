import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { OPPONENT_STANDARD } from "./formations"

const NEW_GAME_UPDATE_EVENT = "newGameUpdate";
const SOCKET_SERVER_URL = "/";

const useGame = (gameCode) => {
    const [opponentCups, setOpponentCups] = useState(OPPONENT_STANDARD.cups)
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { gameCode }
        });

        socketRef.current.on(NEW_GAME_UPDATE_EVENT, (update) => {
            if (update.senderId !== socketRef.current.id) {
                setOpponentCups((opponentCups) => [...update.body])
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [gameCode]);

    const sendUpdate = (updateBody) => {
        socketRef.current.emit(NEW_GAME_UPDATE_EVENT, {
            body: updateBody,
            senderId: socketRef.current.id,
        });
    };

    return { opponentCups, sendUpdate };
};

export default useGame;