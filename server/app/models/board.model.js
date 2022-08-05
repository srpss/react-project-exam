const mongoose = require("mongoose");

const Board = mongoose.model(
  "Board",
  new mongoose.Schema({
    originalPoster:{
        type: String,
        required: true
    },
    image: {type: String},
    date: {type: Date, required: true},
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
  })
);

module.exports = Board;
