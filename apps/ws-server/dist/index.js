import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";
const server = new WebSocketServer({
    port: 3001
});
server.on("connection", async (socket) => {
    await client.user.create({
        data: {
            username: Math.floor((Math.random() * 5000) + 1).toString(),
            password: Math.floor(Math.random() + 1).toString()
        }
    });
    socket.send("Hii there you Got Connected");
});
