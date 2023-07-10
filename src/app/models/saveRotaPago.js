const mongoose = require('../../data')

const RotaPagadaSchema = new mongoose.Schema({

    routerPrivadeCurso: {

        type: String,
        require: true,
    },
    descricao:{

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

 
const RotaPagada = mongoose.model('RotaPagada',  RotaPagadaSchema);


module.exports = RotaPagada;
