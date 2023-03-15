const Tweet = require("../models/Tweet");
const User = require("../models/User");

// const token = require("./authController");
// aqui quiero traerme los tweets de los seguidores de
async function show(req, res) {
  console.log(req.auth.id);
  const tweets = await Tweet.find({ userId: req.auth.id });
  return res.json(tweets);
} // Esta funcio deberia ser el index de tweets y mostrar los tweets de los seguidores de la persona logueada y limitarlos a 20 tweets - investigar $in  podria ser necesario

async function tweet(req, res) {
  console.log(req.auth.id);
  // const newTweet = await Tweet.create({
  //   body: req.body.newTweet,
  //   userId: /*req.auth.id ??*/ req.user._id,
  // });
  // const user = await User.findById(req.user.id);
  // user.tweets.push(newTweet);
  // await user.save();
  // await newTweet.save();

  return res.json("/");
}

async function like(req, res) {
  const tweet = await Tweet.findById(req.params.id);

  if (!tweet.likes.includes(req.user._id)) {
    tweet.likes.push(req.user._id);
  } else {
    tweet.likes.pull(req.user._id);
  }

  await tweet.save();

  return res.json("back");
}

async function destroy(req, res) {
  await Tweet.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

  return res.json("back");
}

module.exports = {
  show,
  like,
  tweet,
  destroy,
};
