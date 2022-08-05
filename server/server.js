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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

 
});

app.post('/boards/delete/:_id', async (req, res) => {
  try {
    const boards = await boardsService.removeOne(req.params._id)
  
    res.json("Board was deleted");
  } catch (error) {
    res.json({error: error.message})
  }
  
 
});

app.get('/boards/:_id', async (req, res) => {
  const board = await boardsService.getOne(req.params._id).lean();
  
  res.json(board );

 
});


app.get('/myBoards/:_id', async (req, res) => {
  const boards = await boardsService.getByUserId(req.params._id).lean();
  
  res.json(boards );

 
});


app.post('/boards', async (req, res) => {
  try {
  let data = req.body
  const boards = await boardsService.create(data);
  res.status(201).json(  boards );
  } catch (error) {
    res.status(500).json(  {error: error.message} );
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
