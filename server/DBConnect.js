const mongoose = require('mongoose');

exports.DbInitialize = () => {
    mongoose.connection.on('open', () => console.log('Db is connected...'))
    
    return mongoose.connect('mongodb://localhost/real-estate-db')
}