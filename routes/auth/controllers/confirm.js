const User = require('../../../models/User')

const confirmEmail = async (req, res) => {
    let user = await User.findOne({
        confirmationCode: req.params.code
    })
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    user.status = 'Active'
    user.save((err) => {
        if (err) {
            return res.status(500).json({ message: err })
        }
    })
    return res.redirect(`${process.env.CLIENT_URL}/login`)
}

module.exports = confirmEmail