const authRoute = require("./auth.route")
const profileRoute = require('./api/profile.route');
const wallet = require("./api/wallet.route")
const crash = require("./api/crashgame.route")

const routeManager = (app) => {

    // API Routes
    app.use("/auth", authRoute);
    // app.use('/api/games', gameRoute);
    app.use('/api/user/crash-game', crash);
    app.use("/api/profile", profileRoute);
    app.use("/api/wallet", wallet);

}

module.exports = routeManager