

const getProjects = (req, res) => {
    res.send('Array of projects')
}

const getProject = (req, res) => {
    res.send('project with id')
}

const createProject = (req, res) => {
    res.send('create project')
}

const updateProject = (req, res) => {
    res.send('update project')
}

const deleteProject = (req, res) => {
    res.send('project delete')
}


module.exports = { getProjects, getProject, updateProject, createProject, deleteProject }