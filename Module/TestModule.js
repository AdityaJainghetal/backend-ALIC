const mongoose = require("mongoose");

const preSchema = new mongoose.Schema({

  images: [
    {
      type: String
    }

  ],
  Price: {
    type: Number,
  },
  testmodule: {
    type: String,
  },
  Durations: {
    type: String,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  CourseDescription: {
    type: String,
  },


  LastDate: { // Changed to Date if it's a date field
    type: Date,
  },

  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model("coursetest", preSchema);
