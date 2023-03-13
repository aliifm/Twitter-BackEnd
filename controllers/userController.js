const User = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {}

async function userFollowing(req, res) {
  const profileUser = await User.findOne({ username: req.params.username });
  const user = await User.findOne({ id: req.params.id }).populate({
    path: "following",
    select: "-password -following -followers",
  });
  // https://mongoosejs.com/docs/populate.html#query-conditions

  const following = user.following;
  return res.render("pages/following", { following, profileUser });
}

async function userFollowers(req, res) {
  const profileUser = await User.findOne({ username: req.params.username });
  const user = await User.findOne({ id: req.params.id }).populate({
    path: "followers",
    select: "-password -following -followers",
  });
  // https://mongoosejs.com/docs/populate.html#query-conditions

  const followers = user.followers;
  return res.render("pages/followers", { followers, profileUser });
}

// Display the specified resource.
async function show(req, res) {
  const profileUser = await User.findOne({ username: req.params.username }).populate("tweets");
  const myUser = await User.findById(req.session.passport.user);
  return res.render("pages/profile", {
    profileUser,
    myUser,
  });
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  return res.redirect("/login");
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

  res.redirect("back");
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...

// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  userFollowing,
  userFollowers,
  follow,
};
