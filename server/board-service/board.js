const Board = require("../app/models/board.model");
const User = require("../app/models/user.model");
const bcrypt = require("bcryptjs");

exports.lasted3HomesLeaned = () => Board.find().sort({_id: -1}).limit(3);
exports.getMy = (id) => Board.find({owner: id});
exports.getAll = () => Board.find();
exports.getByUserId = (id) => Board.find({"owner": id});
exports.getOne = (id) =>  Board.findById(id)
exports.removeOne = (id) => Board.deleteOne({_id: id})
exports.update = (id, data) => Board.updateOne({_id: id}, {$set: data}, {runValidators: true})
exports.create = async (data) =>{
    const board = await Board.create(data)
    return board
} 

exports.getUser = (id) => User.find({_id: id});

exports.updateUser = (id, data) => User.updateOne({_id: id}, {$set: data}, {runValidators: true})

exports.updatePass = (id, data) => {
    const password = bcrypt.hashSync(data.password, 8)
    data = {password: password}
    return User.updateOne({_id: id}, {$set: data}, {runValidators: true})
     
}

exports.updateBoard = (id, data) => {

    return Board.updateOne({_id: id}, {$push: data}, {runValidators: true})
     
}