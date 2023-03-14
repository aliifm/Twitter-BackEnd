const User = require("../models/User");
const Tweet = require("../models/Tweet");

// Display a listing of the resource.
async function index(req, res) {
  // muestra informacion random de tweet e invita a loguearse o registrarse a la pagina
  return res.json(
    "CONSULTAR si muestra informacion random de tweet e invita a loguearse o registrarse a la pagina",
  );
}

async function show(req, res) {
  // buscas al usuario en la base de datos y se muestran la info de los tweets(.map) de seguidos y seguidores
  // const user = await User.findOne({ id: req.params.id }).populate("following");
  // const tweet = await User.findOne({ id: req.params.id }).populate("tweets");
  // return res.json(user.following[2].tweets[1]);

  const users = await User.findOne({ id: req.params.id });
  const tweets = await Tweet.find().populate("userId").sort({ createdAt: -1 }).limit(20);
  return res.json({ users, tweets });
}

async function userFollowing(req, res) {
  //
  const profileUser = await User.findOne({ username: req.params.username });
  const user = await User.findOne({ id: req.params.id }).populate({
    path: "following",
    select: "-password -following -followers",
  });
  // https://mongoosejs.com/docs/populate.html#query-conditions

  const following = user.following;
  return res.json("pages/following", { following, profileUser });
}

async function userFollowers(req, res) {
  const profileUser = await User.findOne({ username: req.params.username });
  const user = await User.findOne({ id: req.params.id }).populate({
    path: "followers",
    select: "-password -following -followers",
  });
  // https://mongoosejs.com/docs/populate.html#query-conditions

  const followers = user.followers;
  return res.json("pages/followers", { followers, profileUser });
}

// Store a newly created resource in storage.
async function store(req, res) {
  return res.json("/login");
}

async function follow(req, res) {
  const profileUser = await User.findById(req.params.id);
  const loggedUser = await User.findById(req.user.id);

  if (!loggedUser.following.includes(profileUser.id)) {
    loggedUser.following.push(profileUser.id);
  } else {
    loggedUser.following.pull(profileUser.id);
  }

  await loggedUser.save();

  res.json("back");
}

module.exports = {
  index,
  show,
  store,

  userFollowing,
  userFollowers,
  follow,
};
