const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    const token = req.cookies['user']
    if (token) {
        jwt.verify(token, 'tuna', (err, decodedToken) => {
            if (err) {
                res.clearCookie('user')
                return res.redirect('/login')
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;

            next();
        })
    } else {
        next();
    }
}
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('You need to login!')
    }
    next()

}
exports.isGuest = (req, res, next) => {
    if (req.user) {
        
    }
    next()

}

