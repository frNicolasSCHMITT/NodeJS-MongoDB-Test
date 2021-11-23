// server.js
console.log("May Node be with you");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

// connect to DB

MongoClient.connect(
  "mongodb+srv://NicoFullStackDevFR:Polnosimco0@nicoschfrdb.rxm1v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("NicoSCHFRDB");
    const quotesCollection = db.collection("quotes");

    // allow ejs for app
    app.set("view engine", "ejs");
    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }));

    // All your handlers here...
    //Redirection : if request made then result is :
    app.get("/", (req, res) => {
      // res.sendFile(__dirname + "/index.html");
      // Note: __dirname is the current directory you're in.
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
          console.log(results);
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    // port listener
    app.listen(3000, function () {
      console.log("listening on 3000");
    });
  })
  .catch((error) => console.error(error));
