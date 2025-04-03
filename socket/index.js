const { Server } = require("socket.io");
const { Public_Chat } = require("../controllers/public_chat.controller");
const { CrashGameEngine } = require("../controllers/games/crash.controller");

async function createsocket(httpServer){
    const io = new Server(httpServer, {
        cors: {
          origin: ["https://rx-casino.netlify.app","http://localhost:5173","http://localhost:5174" ]
        },
    });
    new Public_Chat(io).connection()
     // Crash Gamem
    new CrashGameEngine(io)
    .run((latestBet) => {
      io.emit("latest-bet", latestBet);
    })
    .catch((err) => {
      console.log("Crash Game failed to start ::> ", err);
    });
}  

module.exports = {createsocket}