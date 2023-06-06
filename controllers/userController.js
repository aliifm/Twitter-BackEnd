const User = require("../models/User");
const Tweet = require("../models/Tweet");

async function showAll(req, res) {
  try {
    const users = await User.find().limit(3);

    const userIds = users.map((user) => user.id); // Map user objects to an array of ids
    if (userIds.includes(req.auth.id)) {
      const indexToRemove = users.findIndex((user) => user.id === req.auth.id); // Find index of user to remove
      users.splice(indexToRemove, 1); // Remove user object at the found index
    } else if (users.length >= 4) {
      users.shift(); // Remove the oldest user from the beginning of the array
    }

    const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
    const newUser = randomUser[0];
    if (newUser && !userIds.includes(newUser.id)) {
      users.push(newUser); // Add the new user to the end of the array
    }

    if (users.length > 3) {
      users.pop();
    }
    return res.json({ users });
  } catch (error) {
    return res.json({ message: "error" });
  }
}

// RUTA ACTUALIZADA
async function show(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username })

      .populate("tweets")
      .sort({ createdAt: -1 })
      .limit(20);

    return res.json({ user });
  } catch (error) {
    return res.json({ message: "error" });
  }
}

// RUTA ACTUALIZADA
// Store a newly created resource in storage.
async function store(req, res) {
  try {
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
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function follow(req, res) {
  try {
    const profileUser = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.auth.id);

    if (!loggedUser.following.includes(profileUser.id)) {
      loggedUser.following.push(profileUser.id);
    } else {
      loggedUser.following.pull(profileUser.id);
    }

    await loggedUser.save();

    res.json("Siguiendo a un usuario");
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function userFollowStatus(req, res) {
  try {
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
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function userFollowing(req, res) {
  try {
    const profileUser = await User.findOne({ username: req.params.username });
    const user = await User.findOne({ id: req.params.id }).populate({
      path: "following",
      select: "-password -followers",
    });

    const following = user.following;
    return res.json({ following, profileUser });
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function userFollowers(req, res) {
  try {
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
  } catch (error) {
    return res.json({ message: "error" });
  }
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
