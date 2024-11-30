const express = require('express');
const Sonhos = require('../models/Sonho');
const authProject = require('../middlewares/auth')
const router = express.Router();




router.use(authProject);



router.get('/', async (req, res) =>{
    try {

        const listSonho = await Sonhos.find({user:req.useId}).populate('user')

        return res.status(200).json(listSonho)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error:error})
        
    }
})



router.get('/:id' , async (req, res) =>{

     try {

        const listId = await Sonhos.findById(req.params.id).populate('user');

        return res.status(200).send(listId)
        
     } catch (error) {

        console.log(error)
        return res.status(400).send({error:error})
        
     }
})


router.post('/', async (req, res) => {

    try {


        const { nameSonho, descricaoSonho, valorSonho, categoria,comentarioSonho, ponto} = req.body;

        const newSonho = await Sonhos.create({
            nameSonho,
            descricaoSonho,
            valorSonho,
            comentarioSonho,
            categoria,
            ponto,
            user: req.useId

        });
        
    //     await Promise.all(commit.map( async list => {

    //     const projectCommit = new CommitSonhos({ ...list, newSonho: newSonho._id });

    //     await projectCommit.save();

    //     newSonho.commit.push(projectCommit);
    // }));

        await newSonho.save();

        return res.send({ newSonho })
        
    } catch (error) {

        console.log(error)
        return res.status(400).send({error:error})
        
    }
})


router.delete('/:id', async (req, res) => {
    try {
        // Encontra e remove o documento diretamente
        const Remove = await Sonhos.findByIdAndDelete(req.params.id);

        if (!Remove) {
            return res.status(404).send({ msg: 'Sonho não encontrado' });
        }

        return res.status(200).send({ msg: 'Sonho apagado' });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: 'Erro ao apagar o sonho' });
    }
});



module.exports = app => app.use('/sonho', router);