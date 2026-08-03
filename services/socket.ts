import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * Lazily creates one socket connection for the whole app. Call this from
 * a client component (e.g. inside a useEffect in the room page) once
 * server.js actually initializes a socket.io server.
 */
export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000", {
      withCredentials: true,
      autoConnect: false,
    });
  }
  return socket;
}

// Suggested event names to keep frontend/backend in sync:
//   client -> server: "room:join" { roomId }, "message:send" { roomId, content }
//   server -> client: "message:new" Message, "presence:update" { userId, status }
