const { Router } = require('express')
const checkOwner = require('../../middleWares/checkOwner')
const { checkPrivacySettings } = require('../../middleWares/checkPrivacySettings')
const { isAuth } = require('../auth/controllers/authMe')
const router = Router()
const projectRouter = require('../project/project')
const searchRouter = require('../search/search')

const { getUsers, getUser, getMyProfile } = require('./userControll')

router.get('/home', isAuth, getMyProfile)
router.get('/', getUsers)
router.get('/:userId', checkOwner, checkPrivacySettings, getUser)
router.use('/:userId/projects', projectRouter)
router.use('/:userId/search', searchRouter)

module.exports = router