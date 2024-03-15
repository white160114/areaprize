const mysql = require("mysql");
const config = require("./config.js");
const crypto = require("crypto");

const con = mysql.createConnection({
  host: "localhost",
  user: "areaprize",
  password: config.password,
  database: "areaprize",
});

async function GetForm(action, table_name, body) {
  console.log("Body:", body, "=>", table_name);
  var result = "";

  if (action == "insert") {
    result = Insert(table_name, body);
  } else if (action == "update") {
    result = Update(table_name, body);
  } else if (action == "delete") {
    result = Delete(table_name, body);
  } else if (action == "login") {
    result = Login(body);
  } else {
    return "unknown action.";
  }

  return result;
}

// INSERT
async function Insert(table_name, body) {
  switch (table_name) {
    case "USERS":
      const existingUser = await CheckExisting("user_name", body.user_name);
      const existingMail = await CheckExisting("mail", body.mail);
      if (existingUser) {
        return { error: "User name already exists." };
      } else if (existingMail) {
        return { error: "This email already exists." };
      }
      body.password = ConvertPassword(body.password);
      break;
    case "COMMENTS":
      console.log(body);
      body.user_id = "1";
      break;
    default:
      return `Cannot insert into this table. Table name: ${table_name}`;
  }
  const col_name = Object.keys(body);
  console.log("col_name=>", col_name);

  const values = Object.values(body).map((value) =>
    typeof value === "string" ? `'${value}'` : value
  );
  console.log("values=>", values);
  var execute_sql = `INSERT INTO ${table_name} (${col_name.join(
    ","
  )}) VALUES(${values.join(",")})`;
  console.log("sql=>", execute_sql);

  return new Promise((resolve, reject) => {
    RunSQL(execute_sql, false, (err, result) => {
      if (err) {
        console.log(err.message);
        reject(err.message);
      } else {
        resolve("true");
      }
    });
  });
}
// UPDATE
async function Update(table_name, body) {
  if (table_name == "USERS") {
  } else if (table_name == "WORKS") {
  } else if (table_name == "TEST") {
  } else {
    return `This table cannot be edited. Table name: ${table_name}`;
  }
}
// DELETE
async function Delete(table_name, body) {
  if (table_name == "USERS") {
  } else if (table_name == "WORKS") {
  } else if (table_name == "TEST") {
  } else {
    return `This table cannot be deleted. Table name: ${table_name}`;
  }
}

// ログイン
async function Login(body) {
  const user_mail = body.mail;

  body.password = ConvertPassword(body.password);

  const execute_sql = `SELECT mail, password FROM USERS WHERE mail = "${user_mail}"`;
  console.log("sql=>", execute_sql);
  return new Promise((resolve, reject) => {
    RunSQL(execute_sql, false, (err, result) => {
      if (err) {
        console.log(err.message);
        reject(err.message);
      } else {
        if (result[0].password == body.password) {
          resolve("true");
        } else {
          resolve("false");
        }
      }
    });
  });
}

// 作品投稿
async function UploadWork(body) {
  const user_id = 1;
  const theme_id = 1;
  const keys = Object.keys(body);

  console.log("col_name=>", keys);

  const body_data = Object.values(body).map((value) =>
    typeof value === "string" ? `'${value}'` : value
  );
  console.log("values=>", body_data);

  var execute_sql = `INSERT INTO WORKS (${keys.join(
    ", "
  )}, made_by, theme_id) VALUES (${body_data.join(
    ", "
  )}, ${user_id}, ${theme_id})`;
  console.log("sql=>", execute_sql);
  return new Promise((resolve, reject) => {
    RunSQL(execute_sql, false, (err, result) => {
      if (err) {
        console.error(err.message);
        reject(err.message); // エラーが発生した場合はrejectする
      } else {
        // 成功した場合、追加のSQLクエリを実行する
        const sql = `SELECT * FROM WORKS`;
        RunSQL(sql, false, (err, work_id) => {
          if (err) {
            console.error(err);
            reject(err); // エラーが発生した場合はrejectする
          } else {
            const add_point =
              "UPDATE USERS SET rank_point = rank_point + 10 WHERE user_id = 1";
            RunSQL(add_point, false, (err, result) => {
              if (err) {
                console.error(err);
                reject(err); // エラーが発生した場合はrejectする
              } else {
                console.log("Number of records inserted:", result.length);
                resolve(work_id.length); // 成功した場合はresolveする
              }
            });
          }
        });
      }
    });
  });
}

// 重複をチェックする関数
async function CheckExisting(col, check_data) {
  console.log(col);
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM USERS WHERE ${col} = '${check_data}'`;
    RunSQL(sql, false, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length > 0); // 重複があれば true を返す
      }
    });
  });
}

// 全テーブル名を配列で返す
function Tables(callback) {
  const sql = "show tables";
  let tables = [];

  con.query(sql, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    result.forEach((row) => {
      for (const key in row) {
        tables.push(row[key]);
      }
    });
    callback(null, tables);
  });
}

// SQLを実行
function RunSQL(sql, isFormat, callback) {
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
      return;
    } else {
      if (isFormat) result = DateFormat(result);
      callback(null, result);
    }
  });
}
// 全てのテーブルのデータを取得する
function ReturnAllData() {
  return new Promise((resolve, reject) => {
    Tables((err, tables) => {
      if (err) {
        reject(err);
        return;
      }

      const allData = {};

      // 各テーブルごとにデータを取得
      const promises = tables.map((table) => {
        return new Promise((resolve, reject) => {
          const sql = `select * from ${table}`;
          RunSQL(sql, true, (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            allData[table] = result;
            resolve();
          });
        });
      });

      // すべての非同期処理が完了するまで待機
      Promise.all(promises)
        .then(() => resolve(allData))
        .catch(reject);
    });
  });
}

function ConvertPassword(password) {
  const salted_password = password + config.salt;

  const hashed_password = crypto
    .createHash("sha256")
    .update(salted_password)
    .digest("hex");

  // console.log(hashed_password);
  return hashed_password;
}

// 日付フォーマット変更
function DateFormat(item) {
  item.forEach((row) => {
    if (row.date != null) {
      var date = new Date(row.date);

      row.date = `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      // console.log("formatted");
    }
  });

  return item;
}

async function WorkData() {
  const all_data = await ReturnAllData();

  works_data = [];

  all_data.category.forEach((category) => {
    work_data = [];
    all_data.works.forEach((work) => {
      if (work.category_id == category.category_id) {
        work_data.push({
          work_id: work.work_id,
          work_name: work.work_name,
          explanation: work.explanation,
          technical_points: work.technical_points,
          title_image: work.title_image,
          good: work.good,
          theme_id: work.theme_id,
          made_by: work.made_by,
          date: work.date,
        });
      }
    });
    works_data.push({
      category_id: category.category_id,
      work_data,
    });

    // console.log(work_data);
  });
  return works_data;
}

async function CommentData() {
  const all_data = await ReturnAllData();

  comment_data = [];

  all_data.comments.forEach((comment) => {
    if (comment.parent_comment_id == null) {
      reply_comments = [];
      all_data.comments.forEach((reply) => {
        if (comment.comment_id == reply.parent_comment_id) {
          reply_comments.push({
            comment_id: reply.comment_id,
            work_id: reply.work_id,
            user_id: reply.user_id,
            text: reply.text,
            date: reply.date,
          });
        }
      });

      comment_data.push({
        comment_id: comment.comment_id,
        work_id: comment.work_id,
        user_id: comment.user_id,
        text: comment.text,
        date: comment.date,
        reply: reply_comments,
      });
    }
  });

  return comment_data;
}

async function UserData() {
  const all_data = await ReturnAllData();

  users_data = [];

  all_data.users.forEach((user) => {
    user_rank = "";
    rank_icon = "";
    all_data.ranks.forEach((rank) => {
      user_rank_point = user.rank_point;
      if (
        rank.high_point >= user_rank_point &&
        user_rank_point >= rank.low_point
      ) {
        user_rank = rank.rank_name;
        rank_icon = rank.icon;
      }
    });

    user_works = [];
    user_bookmarks = [];
    all_data.works.forEach((work) => {
      theme_name = "";
      prefecture_id = "";
      all_data.theme.forEach((theme) => {
        if (work.theme_id == theme.theme_id) {
          theme_name = theme.theme;
          prefecture_id = theme.prefecture_id;
        }
      });

      prefecture_name = "";
      all_data.prefecture.forEach((prefecture) => {
        if (prefecture.prefecture_id == prefecture_id) {
          prefecture_name = prefecture.prefecture_name;
        }
      });

      category_name = "";
      all_data.category.forEach((category) => {
        if (work.category_id == category.category_id) {
          category_name = category.category_name;
        }
      });

      if (work.made_by === user.user_id) {
        // 作品データを追加
        user_works.push({
          work_id: work.work_id,
          work_name: work.work_name,
          explanation: work.explanation,
          technical_points: work.technical_points,
          title_image: work.title_image,
          good: work.good,
          category_id: work.category_id,
          category_name: category_name,
          theme_id: work.theme_id,
          theme_name: theme_name,
          prefecture_id: prefecture_id,
          prefecture_name: prefecture_name,
          date: work.date,
        });
      }

      all_data.bookmarks.forEach((bookmark) => {
        if (user.user_id == bookmark.user_id) {
          if (bookmark.work_id == work.work_id) {
            user_bookmarks.push({
              work_id: bookmark.work_id,
              work_name: work.work_name,
              explanation: work.explanation,
              technical_points: work.technical_points,
              title_image: work.title_image,
              good: work.good,
              category_id: work.category_id,
              category_name: category_name,
              theme_id: work.theme_id,
              theme_name: theme_name,
              prefecture_id: prefecture_id,
              prefecture_name: prefecture_name,
              date: work.date,
            });
          }
        }
      });
    });

    const user_data = {
      user_id: user.user_id,
      user: [
        {
          user_name: user.user_name,
          mail: user.mail,
          password: user.password,
          profile_icon: user.profile_icon,
          rank_point: user.rank_point,
          user_rank: user_rank,
          rank_icon: rank_icon,
        },
      ],
      works: user_works,
      bookmarks: user_bookmarks,
    };
    users_data.push(user_data);
    // console.log(users_data);
  });

  console.log("return users data!");
  return users_data;
}

module.exports = {
  RunSQL,
  Tables,
  ReturnAllData,
  GetForm,
  UploadWork,
  UserData,
  WorkData,
  CommentData,
};
