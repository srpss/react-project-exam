const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(require("body-parser").json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS",);
  res.header('Access-Control-Allow-Credentials', false,);
  res.header('Access-Control-Max-Age', '86400',);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-Authorization, X-Admin');
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded

const db = require("./app/models");
const boardsService = require("./board-service/board");
const { authJwt } = require("./app/middlewares");
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
  try {
    const boards = await boardsService.getAll().lean();

    res.json(boards);
  } catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/myboards/:id', [authJwt.verifyToken], async (req, res) => {
  const id = req.params.id
  try {
    const boards = await boardsService.getMy(id).lean();

    res.json(boards);
  } catch (error) {
    res.json({ error: error.message })
  }
});

app.get('/user/:id', async (req, res) => {
  const id = req.params.id
  try {
    const user = await boardsService.getUser(id).lean();
    const editUser = [{_id:user[0]._id, username: user[0].username, image: user[0].image}]
    
    res.json(editUser);
  } catch (error) {
    res.json({ error: error.message })
  }
});

app.post('/user/:id', [authJwt.verifyToken], async (req, res) => {
  const id = req.params.id
  const data = req.body
  try {
    const user = await boardsService.updateUser(id, data).lean();

    res.json(user);
  } catch (error) {
    res.json({ error: error.message })
  }
});

app.post('/user-pass/:id', [authJwt.verifyToken], async (req, res) => {
  const id = req.params.id
  
  const password = req.body
 
  try {
    const user = await boardsService.updatePass(id, password).lean();
   
    res.json({ message: "Password was updated!" });
  } catch (error) {
    res.json({ error: error.message })
  }
});
// app.get('/my-user/:id', async (req, res) => {
//   const id = req.params.id
//   try {
//     const boards = await boardsService.getMyUser(id).lean();

//     res.json(boards );
//   } catch (error) {
//     res.json({error: error.message})
//   }



// });

app.post('/boards/delete/:_id', async (req, res) => {
  try {
    const boards = await boardsService.removeOne(req.params._id)

    res.json(`Board was deleted ${boards}`);
  } catch (error) {
    res.json({ error: error.message })
  }


});

app.get('/boards/:_id', async (req, res) => {
  try {
    const board = await boardsService.getOne(req.params._id).lean();

    res.json(board);
  } catch (error) {
    res.json({ error: error.message })
  }



});


app.post('/boards', async (req, res) => {
  try {

    let data = req.body

    const boards = await boardsService.create(data);

    res.status(201).json(boards._id);
  } catch (error) {
    res.status(500).json({ error: error.message });

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
