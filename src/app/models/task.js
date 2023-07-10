const mongoose = require('../../data')
const bcrypt =  require('bcryptjs')

const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
        },
    Project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projeto',
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    Completed:[{
        type: Boolean,
        require:true,
        default: false
    }],
    createdAt:{
        type:Date,
        default: Date.now
    }

});

 
const Task = mongoose.model('Task',  TaskSchema);


module.exports = Task;
