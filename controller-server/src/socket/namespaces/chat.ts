import { Server } from "socket.io";

export function useNamespace_chat(io: Server) {

  const currentIO = io.of('/chat');
  
  currentIO.on("connection", (socket) => {
    console.log("= socket/chat : A USER CONNECTED");
    socket.emit("state", "welcome!");
  })

  currentIO.on("disconnect", (socket) => {
    console.log("= socket/chat : A USER DISCONNECTED");
  })

  currentIO.on("something", (socket) => {
    console.log("something evoked!")
    console.log("hey");
    console.log("aaaa");
    console.log("fuck!!!");
    console.log("fuck!!!!!!!");
    console.log("fucker fucker");
    console.log("I have to adopt to this keymap...");
    console.log("fuck!!!!!!");
    console.log("please motherfucker");
    console.log("fucker!!!!");
    console.log("hey");
  })
}