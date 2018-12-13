const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth')

const Project = require('../models/Project')
const Task = require('../models/Task')

router.use(authMiddleware)

router.get('/', findAll)
router.post('/', save)
router.get('/:projectId', findById)
router.put('/:projectId', update)
router.delete('/:projectId', remove)

async function findAll(req, res) {
    try {
        const projects = await Project.find().populate(['user', 'tasks'])

        return res.send({ projects })
    } catch (error) {
        return res.status(400).send({ error: 'Error loading projects'})
    }
}

async function save(req, res) {
    try {
        const { title, description, tasks } = req.body
        const project = await Project.create({ title, description, user: req.userId })

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project.id })
            await projectTask.save()
            project.tasks.push(projectTask)
        }))

        await project.save()
        return res.send({ project })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error create a new project'})
    }
}

async function findById(req, res) {
    try {
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks'])

        return res.send({ project })
    } catch (error) {
        return res.status(400).send({ error: 'Error loading project'})
    }
}

async function update(req, res) {
    try {
        const { title, description, tasks } = req.body
        const project = await Project.findOneAndUpdate(req.params.projectId, {
            title,
            description
        }, {new: true} )

        project.tasks = []
        await Task.deleteOne({ project: project.id })

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project.id })
            await projectTask.save()
            project.tasks.push(projectTask)
        }))

        await project.save()
        return res.send({ project })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error updating project'})
    }
}

async function remove(req, res) {
    try {
        await Project.findOneAndDelete(req.params.projectId)

        return res.send()
    } catch (error) {
        return res.status(400).send({ error: 'Error delete project'})
    }
}

module.exports = app => app.use('/projects', router)