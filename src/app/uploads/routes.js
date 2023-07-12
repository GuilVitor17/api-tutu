const express = require('express')
const multer = require('multer');
const multerConfig = require('../config/multer')
const authProject = require('../middlewares/auth')


const Upload = require('../models/upload')

const router = express.Router();

router.use(authProject);


router.get('/post', async (req, res) => {

    try {
        const posts =  await Upload.find({user: req.useId}).populate('user');

        return res.send({ posts })

    } catch (error) {
         console.log(error)
        return res.status(400).send({ error: 'erro ao encontrar projeto por Id' })


    }
   
})

router.get('/:uploadId', async (req, res) => {

    try {
        const posts =  await Upload.findById(req.params.uploadId).populate('user');

        return res.send({ posts })

    } catch (error) {
         console.log(error)
        return res.status(400).send({ error: 'erro ao encontrar projeto por Id' })


    }
   
})

router.post('/post', multer(multerConfig).single('file'), async (req, res) =>{

    try {
        const { originalname: name, size, key, location : url = '' } = req.file;

        const image = await Upload.create({
            name,
            size,
            key,
            url,
            user: req.useId,


   });

   return res.json(image)
   
    } catch (error) {
       console.log(error)
       return res.status(400).send({error: 'Deu Um error'})
        
    }
   

});



router.delete('/post/:id', async (req, res) => {

    try {

        const post = await Upload.findByIdAndDelete(req.params.id);
    
        return res.status(200).send({msg:'Imagem Deletada'})
        
    } catch (error) {

        console.log(error)
        return res.status(400).send({error:error});
        
    }

});






module.exports = app => app.use('/upload', router);
