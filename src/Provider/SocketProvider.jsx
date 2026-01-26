import { useEffect } from "react";
import { socket } from "../Socket/socket";

const SocketProvider = ({ userId, children }) => {
    useEffect(() => {
        if (!userId) return;

        // Connect once
        if (!socket.connected) socket.connect();

        // Register user once
        socket.emit("register-user", userId);

        // DON'T disconnect socket here! Keep it alive globally
    }, [userId]);

    return children;
};

export default SocketProvider;