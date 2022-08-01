# Tasks

## Initial setup
1. Initialize project npm init -y
2. install dependancy npm install express nodemon express-handlebars bcrypt mongoose jsonwebtoken cookie-parser
3. add resources from exam
4. set express in index.js , config file is const.js
const app = express();

app.listen(PORT, () => console.log(`server is runnning on port ${PORT}...`))

body parser app.use(express.urlencoded({extended: false}));

check for static files in public app.use(express.static('public'))
static path

5. express handle-bars

app.engine('hbs', hbs.engine ({
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

extname, is for extension name to be hbs otherwise it is too long

6. add routes

7. add controller home
8. add layout
9. add home view/template
10. Fix static assets and paths

## Database setup
1. install mongoose
2. configure mongoose
3. create user model

## Authentication
1. Add auth controller
2. Add login and register page
   * modify links in main page hrefs
   * modify names in forms
3. Add post login and register actions
4. Create user
5. Hash password
6. Login action , service method find user, validate password
7. generate jwt token
    * add secret to consts
8. Logout
## Notifications

1. Add notification element to layout


## Error handling
1. Add error mapper

## Others
1. Auth middleware
user http only cookie {httpOnly: true}
2. Navigation Links
3. Route guards at middileware auth
4. add 404 page
5. global error handling
6. multiline error 