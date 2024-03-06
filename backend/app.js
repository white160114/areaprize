const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

// 起動ログ
app.listen(3000, () => {
  console.log(`Server started! click here 'http://localhost:3000'`);
});
