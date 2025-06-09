const mongoose = require("mongoose");
const SyllabusSchema = new mongoose.Schema({
    
  
    Coursename: {
        type: String,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    PDFbrochure: String


},
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Syllabus", SyllabusSchema);