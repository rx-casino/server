const express = require('express')
const router = express.Router()
const requireAuth = require('../../middleware/requireAuth')
const controller = require('../../controllers/profile.controller')

// auth middleware
// router.use();

router.get('/user',requireAuth, controller.handleProfile)
router.get('/:id', controller.externalProfile)

module.exports = router