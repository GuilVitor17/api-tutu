const mongoose = require('../../data')
const bcrypt = require('bcryptjs')
const aws = require('aws-sdk')

const s3 = new aws.S3()


const BlogSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },

    description: {
        type: String,
        require: true,
    },
  
    like: {
        type: Number,
        require: true,
    },
    
    names: String,
    size: Number,
    key: String,
    url: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    }],
   

    createdAt: {
        type: Date,
        default: Date.now
    }

});

BlogSchema.pre('remove', function () {
    if (process.env.STORAGE_TYPE == "s3") {
        return s3.deleteObject({
            Bucket: 'uploadsblog',
            Key: this.key,
        }).promise()
    } else {
        res.send({ msg: 'Impossivel apagar imagem' })

    }
})

const Blog = mongoose.model('Blog', BlogSchema);


module.exports = Blog;
