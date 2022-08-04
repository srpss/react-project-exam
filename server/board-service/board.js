const Board = require("../app/models/board.model");


exports.lasted3HomesLeaned = () => Board.find().sort({_id: -1}).limit(3);
exports.getAll = () => Board.find();
exports.getOne = (id) =>  Board.findById(id)
exports.removeOne = (id) => Board.deleteOne({_id: id})
exports.update = (id, data) => Board.updateOne({_id: id}, {$set: data}, {runValidators: true})
exports.create = async (data) =>{
    const board = await Board.create(data)
} 