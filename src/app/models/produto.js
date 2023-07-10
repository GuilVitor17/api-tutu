const mongoose = require('../../data')

const produtoSchema = new mongoose.Schema({

    aula: {
        type: String,
        require: true,
    },
   
    titulo: {
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

 
const produto = mongoose.model('produto',  produtoSchema);


module.exports = produto;
