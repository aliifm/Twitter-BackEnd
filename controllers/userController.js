const User = require("../models/User");
const Tweet = require("../models/Tweet");

// Display a listing of the resource.
async function index(req, res) {
  // muestra informacion random de tweet e invita a loguearse o registrarse a la pagina
  return res.json(
    "CONSULTAR si muestra informacion random de tweet e invita a loguearse o registrarse a la pagina",
  );
}
// RUTA ACTUALIZADA
async function show(req, res) {
  const user = await User.findOne({ id: req.params.id })
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
  const loggedUser = await User.findById(req.user.id);

  if (!loggedUser.following.includes(profileUser.id)) {
    loggedUser.following.push(profileUser.id);
  } else {
    loggedUser.following.pull(profileUser.id);
  }

  await loggedUser.save();

  res.json("back");
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

module.exports = {
  index,
  show,
  store,
  userFollowing,
  userFollowers,
  follow,
};
