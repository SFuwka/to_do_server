const { Router } = require('express')
const { signUp } = require('./controllers/signUp')
const router = Router()


router.post('/', signUp)

module.exports = router