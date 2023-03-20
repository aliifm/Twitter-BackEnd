const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }));
router.get("/", tweetController.index);
router.get("/show", tweetController.show);
router.get("/:username/show", tweetController.showClickedUserTweets);
router.post("/store", tweetController.tweet);
router.delete("/:id", tweetController.destroy);
router.post("/:id/like", tweetController.like);

module.exports = router;
