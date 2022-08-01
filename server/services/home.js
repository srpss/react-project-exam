const Home = require('../models/Home')

exports.lasted3HomesLeaned = () => Home.find().sort({_id: -1}).limit(3);
exports.getAll = () => Home.find();
exports.getOne = (id) =>  Home.findById(id)
exports.removeOne = (id) => Home.deleteOne({_id: id})
exports.update = (id, data) => Home.updateOne({_id: id}, {$set: data}, {runValidators: true})