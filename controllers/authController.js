const passport = require("passport");

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/login");
  });
}

module.exports = {
  login,
  logout,
};
