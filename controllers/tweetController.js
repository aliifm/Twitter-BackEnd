const passport = require("passport");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function tweet(req, res) {
  const newTweet = await Tweet.create({ body: req.body.newTweet, userId: req.user._id });
  const user = await User.findById(req.user.id);
  user.tweets.push(newTweet);
  await user.save();
  await newTweet.save();

  return res.redirect("/");
}

async function like(req, res) {
  const tweet = await Tweet.findById(req.params.id);

  if (!tweet.likes.includes(req.user._id)) {
    tweet.likes.push(req.user._id);
  } else {
    tweet.likes.pull(req.user._id);
  }

  await tweet.save();

  return res.redirect("back");
}

// async function follow(req, res) {
//   console.log("hola");
//   const profileUser = await User.findById(req.params.id);
//   const user = await User.findById(user.following.id);

//   if (!profileUser.following.includes(req.user.id)) {
//     profileUser.following.push(req.user.id);
//   } else {
//     profileUser.following.pull(req.user.id);
//   }

//   await profileUser.save();

//   return res.redirect("/", { profileUser });
// }

async function destroy(req, res) {
  await Tweet.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

  return res.redirect("back");
}

module.exports = {
  like,
  tweet,
  destroy,
};
