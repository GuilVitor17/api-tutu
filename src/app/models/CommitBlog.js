const mongoose = require('../../data')
const bcrypt =  require('bcryptjs')



const commitBlogSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    name:{
        type:String,
        require: true,

    },
    

    commit:{

        type:String,
        require: true,

    },

   
    createdAt:{
        type:Date,
        default: Date.now
    }

});


 
const commitBlog = mongoose.model('commitBlog',  commitBlogSchema);


module.exports = commitBlog;
