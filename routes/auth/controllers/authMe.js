const authMe = (req, res) => {
    if (!req.session.user) {
        return res.json({ isAuth: false })
    }
    let userWithoutPasswordAndEmail = {}
    for (key in req.session.user) {
        if (key !== 'password' && key !== 'email') {
            userWithoutPasswordAndEmail[key] = req.session.user[key]
        }
    }

    res.status(200).json({ user: userWithoutPasswordAndEmail })
}

const isAuth = (req, res, next) => {
    if (req.session.user) return next()
    return res.status(401).json({ message: 'not authorized' })
}

module.exports = { authMe, isAuth }