const { Router } = require('express')
const router = Router()
const { login, logout, forgotPassword, redirectToResetPasswordForm,resetPassword } = require('./controllers/login')


router.post('/', login)
router.post('/forgotPassword', forgotPassword)
router.get('/confirmReset/:code', redirectToResetPasswordForm)
router.put('/resetPassword', resetPassword)
router.delete('/', logout)

module.exports = router