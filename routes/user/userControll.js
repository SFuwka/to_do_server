const User = require('../../models/User')
const Project = require('../../models/Project')

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
    try {
        const profiles = await User.find({ _id: { $ne: req.session.user } }, { alias: 1, creationDate: 1, projectsCount: 1 })
        return res.json({ profiles, totalCount })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'getUsers error' })
    }
    res.send('Array of users')
}

const getUser = async (req, res) => {
    const { userId } = req.params
    let response = {}
    try {
        const user = await User.findById(userId, { alias: 1, creationDate: 1, projectsCount: 1 })
        if (!user) return res.status(404).json({ message: `no User with id: ${userId}` })
        response.user = user
        //TO_DO privacy handle
        const projects = await Project.find({ user: userId, privacySettings: { $ne: 'private' } })
        if (projects) response.projects = projects
        return res.json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'getUser error' })
    }
}

const updateUser = (req, res) => {
    res.send('update user')
}

const deleteUser = (req, res) => {
    res.send('user delete')
}


module.exports = { getMyProfile, getUsers, getUser, updateUser, deleteUser }