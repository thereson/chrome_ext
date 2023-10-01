const express = require("express");
const fs = require("fs");
const cors = require("cors");
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

app.use(router);
app.use("/api", router);

app.listen(9000, () => {
  console.log("server is running on port 9000 ");
});
