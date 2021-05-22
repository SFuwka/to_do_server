const checkOwner = (req, _, next) => {
    const { userId } = req.params
    //console.log(req.session.user, userId)
    console.log(req.params)
    if (userId && req.session.user !== userId) {
        req.user = userId
        return next()
    }
    if (req.session.user) {
        req.owner = 'self'
        req.user = req.session.user
        return next()
    }
    return next()
}

module.exports = checkOwner