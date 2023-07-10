const mongoose = require('../../data')
const bcrypt =  require('bcryptjs')

const ProjetoSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
        },
    description: {
        type: String,
        require: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    
    createdAt:{
        type:Date,
        default: Date.now
    }

});

 
const Projeto = mongoose.model('Projeto',  ProjetoSchema);


module.exports = Projeto;