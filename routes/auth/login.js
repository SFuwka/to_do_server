const { Router } = require('express')
const router = Router()
const { login, logout } = require('./controllers/login')


router.post('/', login)
router.delete('/', logout)

module.exports = router