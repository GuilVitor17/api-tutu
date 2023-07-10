const express = require('express');

const router = express.Router()

const authProject = require('../middlewares/auth')

const Blog = require('../models/Blog')

const multerConfig = require('../config/multerBlog');
const multer = require('multer');
const commitBlog = require('../models/CommitBlog');


router.use(authProject)



router.get('/blog' , async (req, res) =>{

    try {

        const UserBlog = await Blog.find({user:req.useId}).populate('user');

        return res.send({UserBlog})
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({error: 'deu um erro'})
    }
})



router.get('/:blog' , async (req, res) =>{
    
    try {

        const IdBlog = await Blog.findById(req.params.blog).populate('user')

        return res.send({IdBlog})
        
    } catch (error) {

        console.log(error)
        return res.status(400).send({error: 'deu um erro'})
        
    }
})



router.post('/blog',  multer(multerConfig).single('file'), async (req, res) =>{

    try {
          
        const { name, description, like, commit } = req.body;
        const { originalname: names, size, key, location: url = '' } = req.file;

        const BlogUser = await Blog.create({
            name,
            description,
            names,
            size,
            key,
            url,
            user: req.useId
        });


        await BlogUser.save();



        return res.json({BlogUser})

        
    } catch (error) {

        console.log(error)
        return res.status(400).send({error: 'deu um erro'})
        
    }

})


router.put('/:blogId',  multer(multerConfig).single('file'), async (req, res) =>{

    try {
          
        const { name, description, like, commit } = req.body;
        const { originalname: names, size, key, location: url = '' } = req.file;

        const BlogUser = await Blog.findByIdAndUpdate(req.params.blogId, {
            name,
            description,
            names,
            size,
            key,
            url,
            user: req.useId
        });
       

        return res.json({BlogUser})

        
    } catch (error) {

        console.log(error)
        return res.status(400).send({error: 'deu um erro'})
        
    }

});

router.delete('/:blog', async (req, res) =>{

    try {

        const blogRemove = await Blog.findById(req.params.blog)

       await blogRemove.remove()

       return res.send({msg:'post removido'})


        
    } catch (error) {


        
    }
})




module.exports = app => app.use('/blog', router);