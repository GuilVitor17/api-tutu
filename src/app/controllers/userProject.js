const express = require('express');
const authProject = require('../middlewares/auth')

const Projeto = require('../models/project')
const Task = require('../models/task');

const router = express.Router();

router.use(authProject);

router.get('/', async (req, res) => {
    try {

        const projects = await Projeto.find({user: req.useId}).populate(['user', 'tasks']);

        return res.send({ projects })
        

    } catch (error) {
        return res.status(400).send({ error: 'erro ao encontrar projeto' })

    }
})

router.get('/:projectId', async (req, res) => {

    try {

        const projects = await Projeto.findById(req.params.projectId).populate('user');

        return res.send({ projects });

    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'erro ao encontrar projeto por Id' })


    }

})

router.post('/', async (req, res) => {

    try {

        const { title, description, tasks } = req.body;

        const project = await Projeto.create({ title, description, user: req.useId });

        await Promise.all(tasks.map(async task => {
            
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);

        }));


        await project.save();


        return res.send({ project });

    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'erro ao criar projeto' })

    }


})


router.put('/:projectId', async (req, res) => {

    try {

        const { title, description, tasks } = req.body;

        const project = await Projeto.findByIdAndUpdate(req.params.projectId, {
            title,
            description,
        }, { new: true });

        project.tasks = [];
        await Task.remove({project: project.id})

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();
            

            project.tasks.push(projectTask);

        }));
        await project.save();


        return res.send({ project });

    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'erro ao criar projeto' })

    }



})

router.delete('/:projectId', async (req, res) => {

    try {

        const projects = await Projeto.findByIdAndRemove(req.params.projectId);

        return res.send({ msg: 'Projeto removido' });

    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'erro ao remover projeto' })


    }


})


module.exports = app => app.use('/project', router);