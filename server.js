const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const multer = require("multer");

//set up storage engine
const storage = multer.diskStorage({
  destination: "./client/public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

//init uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }
}).single("myImage");

//Init express app
const app = express();

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/imageUploadTesting"
);
const db = require("./models");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Send every request to the React app
// Define any API routes before this runs
app.get("/api/images", function(req, res) {
  // console.log("Work or not ???!!!!");
  db.Image.find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.get("/api/random", function(req, res) {
  res.json("Hello World");
});

app.get("/api/section/1", function(req, res) {
  db.Section.find({section_name: "section_1"})
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
})

app.get("*", function(req, res) {
  console.log("hello");
  // res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Post request for creating section
app.post("/api/section", (req, res) => {
  console.log(req.query);

  db.Section.create({
    section_name: req.query.section,
    image_id: req.query.image_id,
    image_filename: req.query.image_filename
  }).then(dbSection => console.log(dbSection));
});

//Post request for Upload
app.post("/api/upload", (req, res) => {
  upload(req, res, err => {
    // console.log(req.body);
    //console.log(req.file);
    if (err) {
      res.json(err);
    } else {
      if (req.file) {
        //console.log(req.file);
        db.Image.create(req.file)
          .then(dbImage => {
            //console.log(dbImage);

            return res.json(dbImage);
          })
          .catch(err => res.json(err));
      } else {
        res.status("409").json("No Files to Upload.");
      }
    }
  });
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
