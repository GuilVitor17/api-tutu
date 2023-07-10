const mongoose = require('../../data')
const bcrypt =  require('bcryptjs')

const DadosSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    idade: {
        type: Number,
        require: true,
    },
    telefone: {
        type: Number,
        require: true,
    },
    sexo: {
        type: String,
        require: true,
    },
    cidade: {
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

 
const Dados = mongoose.model('Dados',  DadosSchema);


module.exports = Dados;
