const fs = require("fs");
const express = require("express");
const yaml = require("js-yaml");
const ejs = require("ejs");
var path = require("path");
const multer = require("multer");
const decompress = require("decompress");
let inventoryName;

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
  decompress(
    __dirname + "/uploads/" + req.body.filename,
    __dirname + "/uploads/"
  )
    .then((files) => {})
    .catch((error) => {
      console.log(error);
    });
  inventoryName =
    (__dirname + "/uploads/" + req.body.filename).split(".zip")[0] + "";
});
app.post("/host-vars", (req, res) => {
  const path = "./" + req.body.ref;
  let obj1 = yaml.load(fs.readFileSync(path, "utf-8"));
  res.send({ response: obj1 });
});

app.get("/host-vars", (req, res) => {
  let hostVarFiles = [];
  const path = inventoryName + "/host_vars";
  fs.readdirSync(path).forEach((file) => {
    hostVarFiles.push(file);
  });
  res.send({ hostVarFiles: hostVarFiles });
});

app.listen(5000);
