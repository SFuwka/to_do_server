const { Router } = require('express')
const confirmEmail = require('./controllers/confirm')
const router = Router()


router.get('/:code', confirmEmail)

module.exports = router