const mongoose = require('mongoose')

const homeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 6
    },
    type:{
        type: String,
        enum:['Apartment', 'Villa', 'House'],
        required: true
    },
    year:{
        type: Number,
        required: true,
        minLength: 1850,
        maxLength: 2021
    },
    city:{
        type: String,
        required: true,
        minLength: 4
    },
    homeImage:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        maxLength: 60
    },
    availablePieces:{
        type: Number,
        required: true,
        minLength: 0,
        maxLength: 10
    },
    rent:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
})

const Home = mongoose.model('Home', homeSchema)

module.exports = Home;