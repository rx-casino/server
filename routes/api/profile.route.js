const express = require('express')
const router = express.Router()
const requireAuth = require('../../middleware/requireAuth')
const controller = require('../../controllers/profile.controller')

// auth middleware
// router.use();

 
router.get('/user',requireAuth, controller.handleProfile)
router.post('/change-username', requireAuth, controller.handleChangUsername)
router.post('/change-profile-img', requireAuth, controller.handleChangeProflePicture)
router.get('/:id', controller.externalProfile)

module.exports = router