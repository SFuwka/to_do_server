const { Router } = require('express')
const { authMe, forgotPassword } = require('./controllers/authMe')
const router = Router()

router.get('/', authMe)

module.exports = router