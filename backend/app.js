const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const SQL = require("./sql.js");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const app = express();

const up_dir =
  path.dirname(__dirname + "/backend").replace(/\\/g, "/") + "/resource/images"; // アプリケーションフォルダのサブディレクトリ "./tmp" をアップロード先にしている。
const upload = multer({ dest: up_dir });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("resource/html"));
app.use(cors());

// フォームの受け取り
app.post(
  "/form/insert/WORKS",
  upload.single("title_image"),
  async (req, res) => {
    try {
      const body = req.body;

      // console.log(req.file);

      const result = await SQL.UploadWork(body);
      // console.log(result);

      if (req.file) {
        const path = req.file.path; // ファイルが保存されている一時的なパス
        // console.log("path--", path);
        const dest = up_dir + "/title" + result + ".png"; // 移動先のパス
        // console.log("dest--", dest);
        fs.renameSync(path, dest); // ファイルを移動
        return res.send({ message: `${dest}にアップロードされました。` });
      } else {
        return res.send({
          message: "ファイルがアップロードされていません。",
        });
      }
    } catch (error) {
      console.error("error message:", error);
      res.send(error);
    }
  }
);

app.post("/form/:action/:table", async (req, res) => {
  const action = req.params.action;
  const table_name = req.params.table;
  const body = req.body;

  // console.log(body);

  try {
    const result = await SQL.GetForm(action, table_name, body);
    console.log("result", result);
    res.send(result);
  } catch (error) {
    console.error("error message:", error);
    res.send(error);
  }
});
// SQL文
app.get("/sql/:sql", (req, res) => {
  const sql = req.params.sql;
  console.log(sql);
  SQL.RunSQL(sql, true, (err, result) => {
    if (err) {
      console.error("Error:", err.message);
      return res.status(500).send(err.message);
    } else {
      res.json(result);
    }
  });
});

// データベースを返す
app.get("/data/:table", async (req, res) => {
  const table_name = req.params.table;

  try {
    // allが送られている場合全件返す
    if (table_name == "all") {
      result = await SQL.ReturnAllData();
      res.json(result);
      return;
    }

    const sql = `select * from ${table_name}`;
    console.log(sql);
    SQL.RunSQL(sql, true, (err, result) => {
      if (err) {
        console.error("Error:", err.message);
        return res.status(500).send(err.message);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.send(error);
  }
});
// テーブル表示
app.get("/tables", (req, res) => {
  SQL.Tables((err, tables) => {
    if (err) {
      console.error("Error:", err.message);
      return res.status(500).send(err.message);
    } else {
      return res.json(tables);
    }
  });
});

// ユーザーごと
app.get("/:table/data", async (req, res) => {
  const table = req.params.table;
  // var result = "";
  if (table == "user") {
    result = await SQL.UserData();
  } else if (table == "work") {
    result = await SQL.WorkData();
  } else if (table == "comment") {
    result = await SQL.CommentData();
  } else if (table == "theme") {
    result = await SQL.ThemeData();
  } else {
    return res.send("unknown request");
  }

  res.json(result);
});

// 画像を返す
app.get("/image/:name", (req, res) => {
  const image_name = req.params.name;

  if (image_name == "all") {
    return res.json(fs.readdirSync("./resource/images"));
  }

  fs.readFile(`resource/images/${image_name}`, (err, data) => {
    if (err) {
      console.error("Error:", err.message);
      return res.status(500).send(err.message);
    }
    res.type("png");
    res.send(data);
  });
});

// 起動ログ
app.listen(3000, () => {
  console.log(`Server started! click here 'http://localhost:3000'`);
});
