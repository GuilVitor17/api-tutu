const mongoose = require('../../data')
const bcrypt =  require('bcryptjs')


const TarefasSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
        },
    description: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    ponto:{
        type: Number,
        require:true

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    
    createdAt:{
        type:Date,
        default: Date.now
    }

});

 
const Tarefas = mongoose.model('Tarefas',  TarefasSchema);


module.exports = Tarefas;