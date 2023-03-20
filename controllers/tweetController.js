const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  const currentUser = await User.findById(req.auth.id);
  const followingUsers = [req.auth.id, ...currentUser.following];

  const tweets = await Tweet.find({ userId: { $in: followingUsers } })
    .populate("userId")
    .sort({ createdAt: -1 })
    .limit(20);

  return res.json({ tweets });
}

async function show(req, res) {
  const tweets = await Tweet.find({ userId: req.auth.id });
  return res.json(tweets);
}

async function showClickedUserTweets(req, res) {
  const clickedUser = await User.findOne({ username: req.params.username }).populate("tweets");
  const clickedUserTweets = clickedUser.tweets;

  return res.json(clickedUserTweets);
}

async function tweet(req, res) {
  const newTweet = await Tweet.create({
    body: req.body.body,
    userId: req.auth.id,
  });
  const user = await User.findById(req.auth.id);
  user.tweets.push(newTweet);
  await user.save();
  await newTweet.save();

  return res.json("Se ha creado un Tweet");
}

async function like(req, res) {
  const tweet = await Tweet.findById(req.params.id);
  if (!tweet.likes.includes(req.auth.id)) {
    tweet.likes.push(req.auth.id);
  } else {
    tweet.likes.pull(req.auth.id);
  }

  await tweet.save();

  return res.json({ like: true });
}

async function destroy(req, res) {
  const tweet = await Tweet.findOneAndDelete({ _id: req.params.id, userId: req.auth.id }).populate(
    "userId",
  );

  return res.json({ delete: true });
}

module.exports = {
  showClickedUserTweets,
  index,
  show,
  like,
  tweet,
  destroy,
};
