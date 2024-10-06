const { Server } = require("socket.io");
const { Public_Chat } = require("../controllers/public_chat.controller");

async function createsocket(httpServer){
    const io = new Server(httpServer, {
        cors: {
          origin: ["https://rx-casino.netlify.app","http://localhost:5173","http://localhost:5174" ]
        },
    });
    new Public_Chat(io).connection()
}

module.exports = {createsocket}