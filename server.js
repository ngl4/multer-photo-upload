const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const aws = require("aws-sdk");
require('dotenv').config();


//Init express app
const app = express();

const path = require("path");
const PORT = process.env.PORT || 3001;
//image upload #1: multer npm (local uploads)
// const multer = require("multer");

//image upload #2: Amazon S3 Bucket
const S3FS = require("s3fs");
const s3fsImpl = new S3FS("cindytestbucket123", {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

//create bucket and multiparty
s3fsImpl.create();
const multiparty = require("connect-multiparty"),
  multipartyMiddleware = multiparty();
app.use(multipartyMiddleware);

//This btoa is just to make binary data into readable String--not really useful
// const btoa = require("btoa");
// encode = data => {
//   var str = data.reduce(function(a, b) {
//     return a + String.fromCharCode(b);
//   }, "");
//   return btoa(str).replace(/.{76}(?=.)/g, "$&\n");
// };

//Set up storage engine using Multer npm
// const storage = multer.diskStorage({
//   destination: "./client/public/uploads/",
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

//init uploads using Multer npm
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2000000 }
// }).single("myImage");

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/imageUploadTesting"
);
const db = require("./models");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post("/api/testupload", function(req, res) {
  // console.log(req.files);
  // console.log(req.file);
  const file = req.files.myImage;
   console.log(file);
 
  const stream = fs.createReadStream(file.path);
  s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
    fs.unlink(file.path, function(err) {
      if (err) {
        console.log(err);
      }
    });
    //  res.json(file.path);
  });

  file.section = "1";
  file.headers = "image";
 console.log(file);

 db.ImageAmazon.create(file)
   .then(dbImageAmazon => {
     //console.log(dbImageAmazon);
     return res.json(dbImageAmazon);
   })
   .catch(err => res.json(err));

});

app.get("/api/testgetimages", function(req, res, next) {

  db.ImageAmazon.find({})
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
  
  // var params = {
  //   Bucket: "cindytestbucket123",
  //   Key: "architecture-1850129_640.jpg"
  // };
  // s3.getObject(params, function(err, data) {
    // res.writeHead(200, {'Content-Type': 'image/jpeg'});
    // res.write(data.Body, 'binary');
    // res.end(null, 'binary');

    // let objectData = data.Body.toString(); // Use the encoding necessary
    // res.send({objectData});
  //   if (err) {
  //     console.Log("lireFic", "ERR " + err);
  //   } else {
  //     console.log("lecture OK");
  //     src = "data:image/png;base64," + encode(data.Body);
  //     res.send(src);
  //   }
  // });
});

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
  db.Section.find({ section_name: "section_1" })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.get("*", function(req, res) {
  console.log("hello");
  // res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.delete("/api/section/1", (req, res) => {
  db.Section.remove({ section_name: "section_1" })
    .then(dbModel => console.log(dbModel))
    // .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
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

//Post request for Upload using multer npm 
// app.post("/api/upload", (req, res) => {
//   upload(req, res, err => {
//     // console.log(req.body);
//     //console.log(req.file);
//     if (err) {
//       res.json(err);
//     } else {
//       if (req.file) {
//         //console.log(req.file);
//         //Please Edit all your code by adding the following two lines
//         const file = req.file;
//         //file.section = "1";
//         db.Image.create(file)
//           .then(dbImage => {
//             //console.log(dbImage);

//             return res.json(dbImage);
//           })
//           .catch(err => res.json(err));
//       } else {
//         res.status("409").json("No Files to Upload.");
//       }
//     }
//   });
// });

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});


