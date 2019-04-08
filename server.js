const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const db = require("./config/database.config.js");
const Promise = require("bluebird");

mongoose.Promise = Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
    .connect(db.url, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to database");
    })
    .catch(err => {
        console.log("could not connect. Exiting...", err);
        process.exit();
    });

require("./app/routes/note.routes.js")(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to notes" });
});

app.listen(PORT, () => {
    console.log("~~~ Tuning in to waves of port " + PORT + "~~~");
});
