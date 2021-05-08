const checkAuth = (req, res, next) => {
    if (!req.session.user) return next('not Authorized')
    return next()
}

module.exports = checkAuth