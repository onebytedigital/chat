import { io } from "socket.io-client";

export const socket = io("http://192.168.15.67:3001", {
  transports: ["websocket"],
});
