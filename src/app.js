const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3005"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json())


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


require("./routes/tutorial.routes")(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Demo curd with nodejs" });
  });
  

// set port, listen for requests
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});