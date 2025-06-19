const mongoose= require("mongoose");
const DynamicSchema = new mongoose.Schema({
     
      DynamicName : {
            type: String
        },
   

})

module.exports = mongoose.model("Dynamic", DynamicSchema);