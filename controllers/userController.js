const User = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {
  res.json("Hello word!");
}

async function userFollowing(req, res) {
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

  store,

  userFollowing,
  userFollowers,
  follow,
};
