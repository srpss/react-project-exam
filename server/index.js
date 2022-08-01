const express = require('express')
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser')
const { DbInitialize } = require('./DBConnect');
const { notFound } = require('./middlewares/not-found');
const authService = require('./services/auth');
const { auth, isAuth, isGuest } = require('./middlewares/isAuth');
const homeService = require('./services/home-create');
const homeResultService = require('./services/home');


const app = express();
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
//Middlewares==========================
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));
app.use(auth)
app.use(express.static('public'));
//HomePage============================
app.get('/', async (req, res) => {

    //const homes = await homeResultService.lasted3HomesLeaned().lean();

    res.send('Test');
});
//Login================================
app.get('/login',  (req, res) => {
    res.send('login with post');
});

app.post('/login',  async (req, res) => {

    try {
        const { username, password } = req.body;
        if (username && password) {
            const user = await authService.login(username, password)
            const token = await authService.createToken(user)

            //res.cookie('user', token, { httpOnly: true })
           res.send(token)
        }
        else {
            const error = 'Username and Password are required'
            return res.send( { error: error.message })
        }
    } catch (error) {

        return res.send({ error: error.message })
    }


});
//Register=============================
app.get('/register',  (req, res) => {
    res.render('register');
});
app.post('/register',  async (req, res) => {
    let { username, password, rePassword, name } = req.body;
    if (username && password && rePassword && name) {
        let data = name.split(' ');

        if (data.length !== 2) {
            return res.render('register', { error: 'Add valid name, example - Martin Slavov' })
        }


        const firstName = data[0]
        const nameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1)
        const lastName = data[1]
        const lastNameCapitalized = lastName.charAt(0).toUpperCase() + lastName.slice(1)

        name = nameCapitalized + " " + lastNameCapitalized

        if (password !== rePassword) {
            return res.rennder('register', { error: 'Password mismatch' })
        }
        try {
            const createdUser = await authService.create({ username, password, name })
            const token = await authService.createToken(createdUser)
            res.cookie('user', token, { httpOnly: true })

            res.redirect('/');
        } catch (error) {
            return res.render('register', { error: error.message })
        }
    } else {
        return res.render('register', { error: 'All fields are required' })
    }
});
//Logout===============================
app.get('/logout', isAuth, (req, res) => {
    res.clearCookie('user')
    res.redirect('/')
});
//Housing-for-rent=====================
app.get('/housing-for-rent', async (req, res) => {
    const homes = await homeResultService.getAll().lean();
    res.render('housing-for-rent', { homes });
});

//Housing-create=======================
app.get('/housing-create', isAuth, (req, res) => {
    res.render('create');
});

app.post('/housing-create', isAuth, async (req, res) => {
    let data = req.body
    try {

        let check = (data.homeImage.slice(0, 8) == 'https://')
        let check2 = (data.homeImage.slice(0, 7) == 'http://')

        if (check == false && check2 == false) {
            throw { message: "image should start with http:// or https://" }
        }

        data.owner = req.user._id
        await homeService.create(data)
        res.redirect('/housing-for-rent');
    } catch (error) {
        res.render('create', { error: error.message, data });
    }

});
//Details-Rent-Edit-Delete==============================
app.get('/:_id/details', async (req, res) => {
    const home = await homeResultService.getOne(req.params._id).lean()
   
    const isAuthor = home.owner == req.user?._id
    let isRenting = false;
    if(isAuthor == false){
        for (let i = 0; i < home.rent.length; i++) {
            if(home.rent[i] == req.user._id){
                isRenting = true;
                break;
            }    
        }
    }
    let hasSpace = true;
    if(home.availablePieces == home.rent.length){
        hasSpace = false
    }
    res.render('details', {...home, isAuthor, isRenting, hasSpace});
});

app.get('/:_id/rent', async (req, res) => {
    try {
       
        const home = await homeResultService.getOne(req.params._id)
        for (let i = 0; i < home.rent.length; i++) {
            if(home.rent[i] == req.user._id){
                throw {error: "You are already renting."}
            }    
        }
        if(home.availablePieces == home.rent.length){
            throw {error: "There is not enough space"}
        }
        home.rent.push(req.user._id)
        home.save()
        res.redirect(`/${req.params._id}/details`);
    } catch (error) {
        console.log(error)
        res.redirect(`/${req.params._id}/details`);
    }
  
})

app.get('/:_id/edit', isAuth, async  (req, res) => {
    const home = await homeResultService.getOne(req.params._id).lean()
    res.render('edit', {...home});
});

app.post('/:_id/edit', isAuth, async (req, res) => {
    let data = req.body
    try {
        const home = await homeResultService.getOne(req.params._id).lean()
        const isAuthor = home.owner == req.user?._id
        if(isAuthor == false){
            throw {message: "Only owner can delete this entity"}
        }
        console.log(data)
        let check = (data.homeImage.slice(0, 8) == 'https://')
        let check2 = (data.homeImage.slice(0, 7) == 'http://')
        console.log(check + " " + check2)
        if (check == false && check2 == false) {
            throw { message: "image should start with http:// or https://" }
        }

        data.owner = req.user._id
        await homeResultService.update(req.params._id, data)
        res.redirect(`/${req.params._id}/details`);
    } catch (error) {
        res.render('create', { error: error.message, data });
    }
});

app.get('/:_id/remove', isAuth, async (req, res) => {
    try {
        
    const home = await homeResultService.getOne(req.params._id).lean()
    const isAuthor = home.owner == req.user?._id
    if(isAuthor == false){
        throw {message: "Only owner can delete this entity"}
    }
    await homeResultService.removeOne(req.params._id)
    res.redirect('/housing-for-rent');
    } catch (error) {
        res.render(`/:${req.params._id}/details`, { error: error.message });
    }
    
    
    
});
//Search===============================
app.get('/search', isAuth, (req, res) => {
    res.render('search');
});
//404 for unkown pages=================
app.use(notFound)
//Listen on port 3000=================
app.listen(3000, () => console.log('Server started http://localhost:3000...'))

//Database==============================
DbInitialize();

