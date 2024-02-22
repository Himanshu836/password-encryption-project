const  mongoose = require("mongoose")

const encryptionDatabase = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("encrypted_db",encryptionDatabase)

