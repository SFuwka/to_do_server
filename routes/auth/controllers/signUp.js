const User = require('../../../models/User')
const jwt = require('jsonwebtoken')
const { sendConfirmationEmail } = require('../../../utils/mailer')


const signUp = async (req, res) => {
    const { name, surname, email, password, alias } = req.body
    if (!name) { return res.status(400).json({ errType: 'name', message: 'Name is required' }) }
    if (!surname) { return res.status(400).json({ errType: 'surname', message: 'Surname is required' }) }
    if (!email) { return res.status(400).json({ errType: 'email', message: 'Email is required' }) }
    if (!password) { return res.status(400).json({ errType: 'password', message: 'Password is required' }) }
    if (!alias) { return res.status(400).json({ errType: 'alias', message: 'Alias is required' }) }

    const candidate = await User.findOne({ email })
    if (candidate) {
        return res.status(400).json({ errType: 'email', message: 'An account with that email address already exists. Please login to continue' })
    }
    const aliasCandidate = await User.findOne({ alias })
    if (aliasCandidate) {
        return res.status(400).json({ errType: 'alias', message: 'Alias alreadty exists' })
    }

    const token = jwt.sign({ email }, process.env.MAILER_SECRET)
    const user = new User({ name, surname, email, alias, confirmationCode: token })
    const hashedPassword = await user.hashPassword(password)
    user.password = hashedPassword

    try {
        await user.save()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ errType: 'common', message: 'Something went wrong when trying to save' })
    }
    res.status(201).json({ message: 'account succesfully created, check your email' })

    sendConfirmationEmail(user.name, user.email, token)
}

module.exports = { signUp }