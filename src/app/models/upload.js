const mongoose = require('../../data')
const bcrypt =  require('bcryptjs')
const aws =  require('aws-sdk')

const s3 = new aws.S3()


const UploadSchema = new mongoose.Schema({

   name: String,
   size: Number,
   key: String,
   url: String,
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },

    createdAt:{
        type:Date,
        default: Date.now
    }

});

UploadSchema.pre('remove', function(){
    if (process.env.STORAGE_TYPE == "s3"){
        return s3.deleteObject({
            Bucket: 'uploadsapp',
            Key: this.key,
        }).promise()
    } else{
        res.send({msg:'Impossivel apagar imagem'})

    }
})
 
const Upload = mongoose.model('Upload',  UploadSchema);


module.exports = Upload;
