const mongoose = require("mongoose");


const Artigo = new mongoose.Schema({
  tittle: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},
  {
    timestamps: true,
  });

mongoose.model('artigo', Artigo);