const User = require('../../../models/User')
const jwt = require('jsonwebtoken')
const { sendForgotPasswordEmail } = require('../../../utils/mailer')

const login = async (req, res) => {
    const { email, password, rememberMe } = req.body

    if (!email) return res.status(400).json({ message: 'empty email', errType: 'email' })
    if (!password) return res.status(400).json({ message: 'empty password', errType: 'password' })

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: 'user with this email does not exist', errType: 'email' })
    }
    const isMatch = await user.comparePasswords(password)

    if (!isMatch) {
        return res.status(400).json({ message: 'incorrect password, try again', errType: 'password' })
    }
    if (user.status != "Active") {
        return res.status(401).send({
            errType: 'pendingAccount',
            message: "Please verify your Email!",
        });
    }

    req.session.user = user._id
    console.log(rememberMe, 'AAAAA')
    if (!rememberMe) {
        req.session.cookie.maxAge = 30 * 60 * 1000 //30min
    } else {
        req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000 //7 days
    }

    res.json({
        name: user.name, surname: user.surname, gender: user.gender,
        birthday: user.birthday, country: user.country, city: user.city,
        _id: user._id, avatar: user.avatar, nickName: user.nickName
    })
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    if (!email) return res.status(400).json({ message: 'empty email', errType: 'email' })

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'user with this email does not exist', errType: 'email' })

    const token = jwt.sign({ email }, process.env.MAILER_SECRET)
    await User.updateOne({ email }, { $set: { resetPasswordCode: token } })
    try {
        sendForgotPasswordEmail(email, user.name, token)
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong when trying to send email' })
    }

    res.json({ message: 'check your email to continue' })
}

const redirectToResetPasswordForm = async (req, res) => {
    const user = await User.findOne({ resetPasswordCode: req.params.code })
    if (user && !user.resetPasswordCode) return res.status(403).send()
    if (user) return res.redirect(`${process.env.CLIENT_URL}/resetPassword/${user.resetPasswordCode}`)
    return res.status(404).send()
}

const resetPassword = async (req, res) => {
    const { password, resetCode } = req.body
    if (!password || !resetCode) return res.status(400).json({ message: 'you must provide valid password and reset code' })
    const user = await User.findOne({ resetPasswordCode: resetCode })
    if (user) {
        const hashedPassword = await user.hashPassword(password)
        try {
            await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword, resetPasswordCode: null } })
            return res.json('password changed')
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'something went wrong when trying to change password' })
        }
    }

}

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        }
    })
    res.status(204).send()
}

module.exports = { login, logout, forgotPassword, redirectToResetPasswordForm, resetPassword }