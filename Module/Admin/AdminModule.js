const mongoose = require("mongoose");

const userSchema = new  mongoose.Schema({
    name : String,
  
    email: {
        type: String,
        required: true,  // Corrected from 'require' to 'required'
        unique: true
    },
    password:String
})

module.exports = mongoose.model("user",userSchema)