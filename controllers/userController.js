const User = require("../models/User");
const Tweet = require("../models/Tweet");

// RUTA ACTUALIZADA
async function show(req, res) {
  const user = await User.findOne({ username: req.params.username })

    .populate("tweets")
    .sort({ createdAt: -1 })
    .limit(20);

  return res.json({ user });
}

// RUTA ACTUALIZADA
// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, username, email, password, avatar } = req.body;
  const user = new User({ firstname, lastname, username, email, password, avatar });
  await user.save();

  return res.json(user);
}

// ----------------------------------------VER------------------------------
// VER SI LAS UTILIZARIAMOS
async function follow(req, res) {
  const profileUser = await User.findById(req.params.id);
  const loggedUser = await User.findById(req.auth.id);

  if (!loggedUser.following.includes(profileUser.id)) {
    loggedUser.following.push(profileUser.id);
  } else {
    loggedUser.following.pull(profileUser.id);
  }

  await loggedUser.save();

  res.json("Siguiendo a un usuario");
}

async function userFollowStatus(req, res) {
  const loggedUser = await User.findById(req.auth.id).populate("followers");
  const clickedUser = await User.findById(req.params.id);

  if (!loggedUser.following.includes(clickedUser.id)) {
    loggedUser.following.push(clickedUser.id);
  } else {
    loggedUser.following.pull(clickedUser.id);
  }
  const loggedUserFollowers = loggedUser.followers;

  await loggedUser.save();

  res.json({ loggedUser, loggedUserFollowers });
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
  return res.json({ following, profileUser });
}

async function userFollowers(req, res) {
  const profileUser = await User.findOne({ username: req.params.username })
    .populate("followers")
    .populate("following");
  const user = await User.findOne({ id: req.auth.id }).populate("followers").populate("following");
  // https://mongoosejs.com/docs/populate.html#query-conditions

  const userFollowers = user.followers;
  const userFollowing = user.following;
  const profileFollowers = profileUser.followers;
  const profileFollowing = profileUser.following;

  return res.json({
    userFollowers,
    userFollowing,
    profileFollowers,
    profileFollowing,
    profileUser,
  });
}

module.exports = {
  userFollowStatus,
  show,
  store,
  userFollowing,
  userFollowers,
  follow,
};
