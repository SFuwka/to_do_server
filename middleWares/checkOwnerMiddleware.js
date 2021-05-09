const checkOwner = (req, res, next) => {
    if (!req.projectOwner) return next('no project owner')
    if (req.projectOwner === req.session.user) {
        req.projectOwner = 'self'
        return next()
    }
    req.projectOwner = 'notSelf'
    return next()
}

module.exports = checkOwner