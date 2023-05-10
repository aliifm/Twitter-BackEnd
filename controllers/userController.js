const User = require("../models/User");
const Tweet = require("../models/Tweet");

async function showAll(req, res) {
  const user = await User.find().limit(3);
  return res.json({ user });
}

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
  //con multer ademas del req.body esta disponible req.file (como en formidable), ahi se guarda el file de la imagen que viene del regist
  const imageURL = "http://localhost:8000/";

  const { firstname, lastname, username, email, password, avatar } = req.body;
  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password,
    avatar: imageURL + req.file.path,
  });

  await user.save();

  return res.json(user);
}

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
  const loggedUser = await User.findById(req.auth.id).populate("followers").populate({
    path: "following",
    select: "-password -following -followers",
  });
  const clickedUser = await User.findById(req.params.id).populate("tweets");

  if (!loggedUser.following.some((user) => user.id == clickedUser.id)) {
    loggedUser.following.push(clickedUser);
  } else {
    loggedUser.following.pull(clickedUser);
  }
  const loggedUserFollowers = loggedUser.followers;
  const loggedUserFollowing = loggedUser.following;

  await loggedUser.save();

  res.json({ loggedUser, loggedUserFollowers, loggedUserFollowing, clickedUser });
}

async function userFollowing(req, res) {
  const profileUser = await User.findOne({ username: req.params.username });
  const user = await User.findOne({ id: req.params.id }).populate({
    path: "following",
    select: "-password -followers",
  });

  const following = user.following;
  return res.json({ following, profileUser });
}

async function userFollowers(req, res) {
  const clickedUser = await User.findOne({ username: req.params.username })
    .populate("followers")
    .populate("following");
  const loggedUser = await User.findOne({ id: req.auth.id })
    .populate("followers")
    .populate("following");

  const userFollowers = loggedUser.followers;
  const userFollowing = loggedUser.following;
  const profileFollowers = clickedUser.followers;
  const profileFollowing = clickedUser.following;

  return res.json({
    userFollowers,
    userFollowing,
    profileFollowers,
    profileFollowing,
    loggedUser,
  });
}

module.exports = {
  showAll,
  userFollowStatus,
  show,
  store,
  userFollowing,
  userFollowers,
  follow,
};
