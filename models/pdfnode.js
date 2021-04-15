const mongoose = require("mongoose");

const pdfNodeSchema = new mongoose.Schema({
   
    pdfdata: {
        type:String,
        
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("pdfNode", pdfNodeSchema);