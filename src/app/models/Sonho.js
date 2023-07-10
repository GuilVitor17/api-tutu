const mongoose = require('../../data')
const bcrypt =  require('bcryptjs')

const SonhosSchema = new mongoose.Schema({

    nameSonho: {
        type: String,
        require: true,
    },
    descricaoSonho: {
        type: String,
        require: true,
    },
    comentarioSonho: {
        type: String,
        require: true,
    },
    ponto:{
        type: Number,
        required: true,
    },
    valorSonho: {
        type: Number,
        require: true,
    },
    categoria: {
        type: String,
        require: true,
    },
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    }],
    
    
    createdAt:{
        type:Date,
        default: Date.now
    }

});

 
const Sonhos = mongoose.model('Sonhos',  SonhosSchema);


module.exports = Sonhos;
