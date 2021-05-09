const checkPrivacySettings = (req, res, next) => {
    if (req.projectOwner === 'self') return next()
    if (req.session.user) {
        console.log('AUTH USER DA')
    }
}

const checkSingleProjectPrivacySettings = (req, res, next) => {
    if (req.projectOwner === 'self') return next()
    req.editable = false
    if (req.project.privacySettings[0] === 'public') {
        return next()
    }
    if (req.project.privacySettings[0] === 'private') {
        return res.status(403).json({ message: 'project is private' })
    }
    if (req.session.user) {
        if (req.project.privacySettings[0] === 'publicReg') {
            return next()
        }
        //toDo array of users
    }
    return res.status(403).json({message: 'project is open for registered users only'})
    
}

module.exports = { checkPrivacySettings, checkSingleProjectPrivacySettings }