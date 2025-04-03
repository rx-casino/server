const express = require('express')
const router = express.Router()
const requireAuth = require('../../middleware/requireAuth')
const controller = require("../../controllers/wallet.controllers")

router.get('/get-balance', controller.getPermanentDepositAddress)

module.exports = router