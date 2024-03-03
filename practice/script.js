const fs = require("fs");
const express = require("express");
const yaml = require("js-yaml");
const ejs = require("ejs");
var path = require("path");
const multer = require("multer");
const decompress = require("decompress");
let inventoryName;
let inventoryPath;

// express app
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", uploads.single("files"), (req, res) => {
  inventoryName = req.body.filename.split(".zip")[0];
  decompress(
    __dirname + "/uploads/" + req.body.filename,
    __dirname + "/uploads/"
  )
    .then((files) => {})
    .catch((error) => {
      console.log(error);
    });
  inventoryPath =
    (__dirname + "/uploads/" + req.body.filename).split(".zip")[0] + "";
});
app.post("/host-vars", (req, res) => {
  const path = "./" + req.body.ref;
  let obj1 = yaml.load(fs.readFileSync(path, "utf-8"));
  res.send({ response: obj1, inventory: inventoryName });
});

app.post("/host-vars-expanded", (req, res) => {
  const path = "./" + req.body.ref;

  const arr = req.body.itemArr;
  let obj1 = yaml.load(fs.readFileSync(path, "utf-8"));
  let obj2 = yaml.load(fs.readFileSync(path, "utf-8"));
  arr.map((item) => {
    if (Array.isArray(obj2)) {
      obj2 = obj2[item];
    } else if (typeof obj2 == "object") {
      obj2 = obj2[item];
    } else {
    }
  });
  res.send({ response: obj1, response2: obj2, inventory: inventoryName });
});

app.get("/host-vars", (req, res) => {
  let hostVarFiles = [];
  const path = inventoryPath + "/host_vars";
  fs.readdirSync(path).forEach((file) => {
    hostVarFiles.push(file);
  });
  res.send({ hostVarFiles: hostVarFiles });
});

app.listen(5000);
