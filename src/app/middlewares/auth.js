const jwt = require('jsonwebtoken')
const Authconfig = require('../../config/auth.json')

module.exports = (req, res, next) =>{
    const authHeaders = req.headers.authorization;

    if(!authHeaders)
    res.status(401).send({ error : 'token não informado'});

    const parts = authHeaders.split(' ');

    if(!parts.length === 2)
    return res.status(401).send({error: 'token errado'});

    const [ schema, token ] = parts;

    if(!/^Bearer$/i.test(schema))
    return res.status(401).send({error: 'Token Mal Informado'})

    jwt.verify(token, Authconfig.secret, (err, decoded) => {

        if(err) return res.status(401).send({error: 'Token Invalido'})

        req.useId = decoded.id;
        
        return next();

    })

}