const express = require("express");
const router = express.Router();
const Projeto = require('../../models/produto');
const Pago = require('../../models/saveRotaPago');
const authProject = require('../../middlewares/auth')



router.use(authProject);


router.get('/', async (req, res) =>{

    const curso = await Projeto.find().populate('user')

    return res.json(curso);
})

router.post('/', async (req, res) =>{

    const { aula, titulo} = req.body

    const create = await Projeto.create({

        aula,
        titulo,
        user: req.useId
    })

    return res.status(200).send({create})


     
})


router.get('/rotapaga', async (req, res) =>{


    const list = await Pago.find({user: req.useId}).populate('user')

    return res.json(list);


     
})

router.delete('/rotapaga/:id', async (req, res) =>{

   try {

    const Delete = await Pago.findById(req.params.id);

    await Delete.remove()

    return res.status(200).send({msg:'curso apagado'})
    
   } catch (error) {

    console.log(error)
    
   }

})


router.post('/rotapaga', async (req, res) =>{

    const { routerPrivadeCurso, descricao } = req.body

    const create = await Pago.create({

        routerPrivadeCurso,
        descricao,
        user: req.useId

    })

    return res.status(200).send({create})


     
})



module.exports = app => app.use('/curso', router)