const express = require('express');
const router = express.Router();
const Tarefas = require('../models/Tarefa');
const authProject = require('../middlewares/auth')



router.use(authProject);



router.get('/', async (req, res) =>{

   try {

      const tarefas = await Tarefas.find({user: req.useId}).populate('user')

     return res.json(tarefas) 
    
   } catch (error) {

    return res.status(500).json({error:error})

   }

})


router.get('/:id', async (req, res) =>{

    try {
        const TarefaId = await Tarefas.findById(req.params.id).populate('user')

       return res.send({TarefaId})
        
    } catch (error) {

        console.log(error)
        return res.status(400).send({error:error})
        
    }
})


router.post('/', async (req, res) => {
    
    try {

        const { title,description, date, ponto } = req.body;

        const newTarefa = await Tarefas.create({

            title,
            description,
            date,
            ponto,
            user: req.useId,

        })

        return res.status(201).json({newTarefa})

        
    } catch (error) {
        console.log(error)
        return res.status(400).send({error:error})
        
        
    }


})


router.delete('/:id', async (req, res) =>{
   
    try {

        const deletetarefa = await Tarefas.findById(req.params.id);

        await deletetarefa.remove();

        return res.status(200).send({msg:'Tarefa removida'});
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({error:error});

        
    }


})


module.exports = app => app.use('/tarefa', router);
