const mongoose= require("mongoose");
const BlogSchema = new mongoose.Schema({
        images: [
        {
            type: String
        }
      
    ],
      Blog :{
        type:String
      },
          URL : {
            type: String
        },
      author:{
         type:String
      },
      title:{
        type:String
      },
      Description:{
        type:String
      },
      excerpt:{
        type:String
      },
      LastDate: { // Changed to Date if it's a date field
    type: Date,
  },


})

module.exports = mongoose.model("Blog", BlogSchema);