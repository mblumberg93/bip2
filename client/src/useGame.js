import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_GAME_UPDATE_EVENT = "newGameUpdate";
const SOCKET_SERVER_URL = "/";

const useGame = (gameCode) => {
    const [updates, setUpdates] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { gameCode }
        });

        socketRef.current.on(NEW_GAME_UPDATE_EVENT, (update) => {
            const incomingUpdate = {
                ...update,
                ownedByCurrentUser: update.senderId === socketRef.current.id,
            };
            setUpdates((updates) => [...updates, incomingUpdate]);
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

    return { updates, sendUpdate };
};

export default useGame;