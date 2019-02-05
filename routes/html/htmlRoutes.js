const router = require("express").Router();
const path = require("path");

router
  .route("/")
  .get(function(req, res) {
   // SEND HOME PAGE USING RES.SENDFILE AND PATH.JOIN()
   res.sendFile(path.join(__dirname, "../public/index.html"));
  });

router
  .route("/notes")
  .get(function (req, res) {
    // SEND NOTES PAGE USING RES.SENDFILE AND PATH.JOIN()
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

module.exports = router;
