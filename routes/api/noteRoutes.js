const router = require("express").Router();
const connection = require("../../config/connection");

router.get("/", function (req, res) {
  // query database for all notes and send back as json
  connection.query("SELECT * FROM notes ORDER BY id DESC", function (err, dbQuotes) {
    //I'm using unit 13 Data-Binding to help me, I think this is a parameter but I'm just keeping the variable the same just in case
    if (err) {
      console.log(err);
    }
    res.json(dbQuotes);
  });
});

router.post("/", function (req, res) {
  // INSERT into database the data coming from req.body
  connection.query("INSERT INTO notes SET ?", [req.body], function (err, result) {
    if (err) throw err;

    res.json(result);
  });
});

router.put("/:id", function (req, res) {
  // UPDATE database setting req.body WHERE id = req.params.id
  connection.query("UPDATE notes SET ? WHERE id = ?", [req.body, req.params.id], function (err, result) {
    if (err) throw err;

    res.json(result);
  });
});

router.delete("/:id", function (req, res) {
  // DELETE from database where id = req.params.id
  connection.query("DELETE notes SET ? WHERE id = ?", [req.body, req.params.id], function (err, result) {
    if (err) throw err;

    res.json(result);
  });
});

module.exports = router;