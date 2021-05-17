const User = require('../../models/User')

const getMyProfile = async (req, res) => {
    try {
        const profile = await User.findById(req.session.user)
        const response = {
            alias: profile.alias,
            name: profile.name,
            surname: profile.surname,
            projectsCount: profile.projectsCount,
            projectsLimit: profile.projectsLimit,
            email: profile.email,
            _id: profile._id,
        }
        return res.json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

const getUsers = (req, res) => {
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