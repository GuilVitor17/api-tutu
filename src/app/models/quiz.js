const mongoose = require('../../data')
const bcrypt =  require('bcryptjs')

const QuizSchema = new mongoose.Schema({

    description: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
                
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false,
            },
            ponto: {
                type: Number,
                required: true,
                default: false,
            }
        }
    ],
   
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

 
const Quiz = mongoose.model('quiz',  QuizSchema);


module.exports = Quiz;
