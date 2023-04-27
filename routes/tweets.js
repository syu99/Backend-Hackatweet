var express = require("express");
var router = express.Router();

require("../models/connection");
const Tweet = require("../models/tweets");

//Route pour recuper les tweets
router.get("/", (req, res) => {
  Tweet.find().then((data) => {
    res.json({ tweets: data });
  });
});

router.post("/", (req, res) => {
  const newTweet = new Tweet({
    firstname: req.body.firstname,
    username: req.body.username,
    tweet: req.body.tweet,
    hashtag: req.body.hashtag,
  });

  newTweet.save().then(() => {
    res.json({ result: true });
  });
});

router.post("/:hashtag", (req, res) => {
  Tweet.find({ hashtag: req.body.hashtag }).then((data) => {
    if (data) {
      res.json({ tweets: data });
    }
  });
});

module.exports = router;
