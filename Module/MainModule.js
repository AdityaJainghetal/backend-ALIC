const mongoose = require("mongoose");

const MainSchema = new mongoose.Schema({

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
});

module.exports = mongoose.model("coursemaintest", MainSchema);
