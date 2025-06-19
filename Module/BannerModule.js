const mongoose= require("mongoose");
const BannerSchema = new mongoose.Schema({
        images: [
        {
            type: String
        }
      
    ],
      URL : {
            type: String
        },
    Alternativeimages : [
            {
                type:String
            }
        ]

})

module.exports = mongoose.model("Banner", BannerSchema);