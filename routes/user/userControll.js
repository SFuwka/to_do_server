const User = require('../../models/User')

const getMyProfile = async (req, res) => {
    try {
        const profile = await User.findById(req.session.user, { password: 0, confirmationCode: 0, status: 0 })
        return res.json(profile)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

const getUsers = async (req, res) => {
    let count = Number(req.query.count) || 20
    let page = Number(req.query.page) || 1
    const totalCount = await User.countDocuments()
    console.log(totalCount)
    try {
        const profiles = await User.find({  }, { alias: 1, creationDate: 1, projectsCount: 1 })
        return res.json({ profiles, totalCount })
    } catch (error) {

    }
    res.send('Array of users')
}

const getUser = (req, res) => {
    res.send('user with id')
}

const updateUser = (req, res) => {
    res.send('update user')
}

const deleteUser = (req, res) => {
    res.send('user delete')
}


module.exports = { getMyProfile, getUsers, getUser, updateUser, deleteUser }