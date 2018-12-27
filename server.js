const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const multer = require("multer");

//set up storage engine
const storage = multer.diskStorage({
  destination: "./client/public/uploads/",
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//init uploads
const upload = multer({
  storage: storage
}).single('myImage');

const app = express();

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/imageUploadTesting");
const db = require("./models");

app.get("/image", function(req, res) {
  db.Image.find({})
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Post request
app.post("/api/upload", (req, res)=> {

  upload(req, res, (err) => {
    if (err) {
      res.render("Upload", {
        
      })
    }else {
      console.log(req.file);
      
      res.send("test");
    } 
  })
 
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
