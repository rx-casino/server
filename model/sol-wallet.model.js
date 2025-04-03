const mongoose = require("mongoose");
const schema = mongoose.Schema

const Userschema = new schema({
    user_id: {
        type: String,
        required: true,
        unique : true
    },
    balance: {
        type: Number,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    is_active:{
        type: Boolean,
        required: true,
    }
}, { timestamp : true})

module.exports = mongoose.model('sol_wallet', Userschema)