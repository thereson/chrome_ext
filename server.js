const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const fileupload = require("express-fileupload");

const router = require("./routes/index");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(fileupload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/:video", async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "video/mp4",
  });
  const file = req.params.video;
  filepath = "./routes/uploads/" + file;
  console.log(filepath);
  fs.createReadStream(filepath).pipe(res);
});
app.use(router);
app.use("/api", router);

app.listen(9000, () => {
  console.log("server is running on port 9000 ");
});
