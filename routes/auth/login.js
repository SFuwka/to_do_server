const { Router } = require('express')
const router = Router()
const { login, logout, forgotPassword } = require('./controllers/login')


router.post('/', login)
router.put('/forgotPassword', forgotPassword)
router.delete('/', logout)

module.exports = router