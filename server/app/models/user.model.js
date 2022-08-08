const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {type :String, required:true},
    password: {type :String, required:true},
    image: {type :String, default: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"},
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
