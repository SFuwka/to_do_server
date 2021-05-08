const checkOwner = (req, res, next) => {
    console.log(req.params, req.session.user)
    if (req.params.userId !== req.session.user) {

    } else {
        //ToDo
    }
    next()
}

module.exports = checkOwner