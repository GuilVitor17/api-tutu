const express = require('express');
const router = express.Router()
const Dados = require('../models/Dados');
const authProject = require('../middlewares/auth')



router.use(authProject);


router.get('/dados', async (req, res) =>{

    try {
            const dadosUser = await Dados.find({user: req.useId}).populate('user');

        return res.send( dadosUser )

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error})

        
    }


})


router.get('/:dadosId', async (req, res) => {
  
    try {

        const Dadoss = await Dados.findById(req.params.dadosId).populate('user');

        return res.send({Dadoss})
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({error:'Impossive Buscar usuario'})
        
    }
    
})

router.post('/dados', async (req, res) =>{

    try {
        const { name,sexo,idade,cidade,telefone } = req.body;

        const  question = await Dados.create({
            name,
            sexo,
            idade,
            cidade,
            telefone,
            user: req.useId,

        })

        return res.status(201).json(question)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error})

        
    }

    
})

router.put('/:dados', async (req, res) =>{

    try {

        const { name, idade, cidade, telefone, sexo  } = req.body;

        const NewDados = await Dados.findByIdAndUpdate(req.params.dados,{
            name,
            idade,
            cidade,
            sexo,
            telefone

        })

        return res.status(200).send(NewDados)
        
    } catch (error) {

        return res.status(500).json({"error":error})

        
    }

    
})


module.exports = app => app.use('/Dados', router);
