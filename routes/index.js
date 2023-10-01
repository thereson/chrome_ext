const express = require("express");
const whisper = require("../whisper");
const path = require("path");
const fs = require("fs");

const contr = require("../controller/main");

const router = express.Router();

router.get("/", contr);
router.post("/", async (req, res) => {
  const file = req.files.mfile;
  const filename = new Date().getTime().toString() + path.extname(file.name);
  const savepath = path.join(__dirname, "uploads", filename);
  await file.mv(savepath);
  console.log(file);
  let audio = fs.createReadStream(`${savepath}`);
  let text = await whisper(audio);
  console.log(text);
  res.end("file uploaded successfully");
});

module.exports = router;
