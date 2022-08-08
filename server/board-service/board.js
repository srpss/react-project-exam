const Board = require("../app/models/board.model");


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