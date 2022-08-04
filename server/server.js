const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const boardsService = require("./board-service/board");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get('/boards', async (req, res) => {
  const boards = await boardsService.getAll().lean();
  
  res.json(boards );

  let data = req.body
  try {

      let check = (data.homeImage.slice(0, 8) == 'https://')
      let check2 = (data.homeImage.slice(0, 7) == 'http://')

      if (check == false && check2 == false) {
          throw { message: "image should start with http:// or https://" }
      }

      data.owner = req.user._id
     
      res.redirect('/housing-for-rent');
  } catch (error) {
      res.render('create', { error: error.message, data });
  }
});

app.post('/boards', async (req, res) => {
  try {
    let data = req.body
    data.owner = req.body._id
  const boards = await boardsService.create(data);
  res.status(201).json(  boards );
  } catch (error) {
    
  }
  
});


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
