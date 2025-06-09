const mongoose = require("mongoose");

const judgementSchema = new mongoose.Schema({
  images: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
     category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
  
  description: {
    type: String,
  },
  publicerName : {
    type: String
  },

  lastDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Judgement", judgementSchema);
