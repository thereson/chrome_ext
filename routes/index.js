const express = require("express");
const whisper = require("../whisper");
const path = require("path");
const fs = require("fs");

const contr = require("../controller/main");

const router = express.Router();

router.get("/", contr);
router.post("/", async (req, res) => {
  try {
    const file = req.files.mfile;
    const filename = new Date().getTime().toString() + path.extname(file.name);
    const savepath = path.join(__dirname, "uploads", filename);
    await file.mv(savepath);
    console.log(file);

    let audio = fs.createReadStream(`${savepath}`);
    let audioStream = fs.createWriteStream(`${savepath}.txt`);
    let videoPath = savepath.split("\\");

    videoPath = videoPath[videoPath.length - 1];

    let text = await whisper(audio);
    audioStream.write(text);

    console.log(text);
    let Message = {
      message: "file uploaded successfully",
      url: `http://localhost:9000/api/${videoPath}`,
      transcript: `http://localhost:9000/`,
      status: 200,
    };
    res.json(Message);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
