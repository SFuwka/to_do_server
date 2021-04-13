const User = require('../../../models/User')

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json({ message: 'empty email', errType: 'email' })
    }

    if (!password) {
        return res.status(400).json({ message: 'empty password', errType: 'password' })
    }

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
            message: "Pending Account. Please Verify Your Email!",
        });
    }
    req.session.user = user
    res.json({
        name: user.name, surname: user.surname, gender: user.gender,
        birthday: user.birthday, country: user.country, city: user.city,
        _id: user._id, avatar: user.avatar, nickName: user.nickName
    })
}

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        }
    })
    res.status(204).send()
}

module.exports = { login, logout }