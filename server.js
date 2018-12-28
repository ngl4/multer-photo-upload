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
  storage: storage,
  limits: {fileSize: 2000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');


//checkFileType function 
checkFileType = (file, cb) => {
  //allow extension 
  const filetypes = /jpeg|jpg|png|gif/;
  //check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname){
    return cb(null, true);
  }else {
    cb(err, "Error: Images Only");
  }
}

//Init express app
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
      console.log(err);
      res.json(err);
      // res.render("Upload", {
      //   msg: err
      // })
    }else {
      console.log(req.file);

      db.Image
      .create(req.file)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

    } 
  })
 
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
