const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SECRET = 'tuna'

exports.create = (userData) => User.create(userData)

exports.login = async (username, password) => {
    const user = await User.findOne({username})
   
    if (!user){
        throw {
            message: `Invalid Username or Passwords`
        }
    }
    
  
    const isValid = await bcrypt.compare(password, user.password)
 
    if (!isValid){
        throw {
            message: `Invalid Username or Passwords`
        }
    }
    
    return user
}   

exports.createToken =  (user) => {
    const payload = {_id: user._id, username: user.username, name: user.name}
    const promise = new Promise((resolve, reject) =>{
        jwt.sign(payload, SECRET,{expiresIn: '2d'}, (err, decodedToken) => {
            if(err){
                return reject(err);
            }
            resolve(decodedToken)
        })
    })
    return promise
}