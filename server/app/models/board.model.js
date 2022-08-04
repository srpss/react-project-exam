const mongoose = require("mongoose");

const Board = mongoose.model(
  "Board",
  new mongoose.Schema({
    originalPoster:{
        type: String,
        required: true
    },
    description: {type: String},
    date: {type: Date},
  })
);

module.exports = Board;
