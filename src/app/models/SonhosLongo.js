const mongoose = require('../../data')
const bcrypt =  require('bcryptjs')

const SonhosLongoMedioSchema = new mongoose.Schema({

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

 
const SonhosLongoMedio = mongoose.model('SonhosLongoMedio',  SonhosLongoMedioSchema);


module.exports = SonhosLongoMedio;
