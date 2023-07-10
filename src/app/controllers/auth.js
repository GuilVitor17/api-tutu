const express = require('express');

const User = require('../models/user');

const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const Authconfig = require('../../config/auth.json')

const crypto = require('crypto')

const sgMail = require('@sendgrid/mail')



const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, Authconfig.secret,{
    expiresIn: 8640,
});
}


router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        if (await User.findOne({ email }))
        return res.status(400).send({error: 'Usuario Existente'});

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user,
             token:generateToken({id: user.id}) });
        
    } catch (error) {

        return res.status(400).send({error: 'Registro falhou'});
        
    }
});

router.post('/authenticate', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({email}).select('+password');

    if (!user)
    return res.status(400).send({error: 'usuario inexistente'})

    if (!await bcryptjs.compare(password, user.password))
    return res.status(400).send({error: 'senha incorreta'})

    user.password = undefined;

    res.send({user, token:generateToken({id: user.id})})


});



router.post('/forgot_password', async (req, res) =>{

    const { email } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)



    try {
        const  user = await User.findOne({email})


        if(!user)
        return res.status(400).send({error: 'E-mail não encontrado'})

        const token = crypto.randomBytes(3).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id,{
            '$set':{
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        const msg = {
            to: email, // Change to your recipient
            from: 'contatofelplataforma@gmail.com', // Change to your verified sender
            subject: 'TUTU',
            text: 'and easy to do anywhere, even with Node.js',
            html: `<h2>Olá - ${email}</h2><br />
            <h3>Esqueceu sua senha? Não tem Problema!</h3><br />
            <strong>Esse é seu código para mudar senha</strong><br />
            <h1>${token}</h1><br />
            <h4>Use esse código para mudar a sua senha na plataforma da (TUTU)</h4><br />
            <h5>Depois de 2h o código sera inspirado e você sera forçado a criar outro.</h5><br />`,
          }
          sgMail
            .send(msg)
            .then( async () => {
              console.log('Email sent')
              console.log(msg)

            })
           await res.status(200).send({msg: 'codigo enviado com sucesso'})
    //   console.log(token, now )
    } catch (err) {
        console.log(err)

        res.status(400).send({error: 'Error ao recuperar Senha'})
       
    }

});


router.post('/reset_password' , async (req, res) =>{

    const { email , token , password } = req.body;

    try {
        const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');

        if(!user)
        return res.status(400).send({error: "Usuario Não encontrado" });

        if(token !== user.passwordResetToken)
        return res.status(400).send({error: 'Token Invalido'});

        const now = new Date();

        if(now > user.passwordResetExpires)
        return res.status(400).send({error: 'Token Expirado, gere um novo'})

        user.password = password;

        await user.save();

        res.send();


    } catch (error) {
        
    }

})



module.exports = app => app.use('/auth', router);

