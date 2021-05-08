

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


module.exports = { getUsers, getUser, updateUser, deleteUser }