const authMe = (req, res) => {
   
    if (!req.session.user) {
        return res.json({ isAuth: false })
    }
    res.status(200).json({ user: req.session.user })
}

const isAuth = (req, res, next) => {
    if (req.session.user) return next()
    return res.status(401).json({ message: 'not authorized' })
}

module.exports = { authMe, isAuth }