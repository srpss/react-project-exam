const mongoose = require("mongoose");

const Board = mongoose.model(
  "Board",
  new mongoose.Schema({
    originalPoster:{
        type: String,
        required: true
    },
    image: {type: String},
    description: [{comment: {type: String}, image: {type: String}, owner: {type: String}}],
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {type: Date, required: true},
  })
);

module.exports = Board;
