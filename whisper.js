const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const transcribe = async (file) => {
  const responce = await axios.post(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      file,
      model: "whisper-1",
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  return responce.data.text;
};

module.exports = transcribe;
