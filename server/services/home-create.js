const Home = require('../models/Home')

exports.create = async (data) =>{
    const home = await Home.create(data)
} 