const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

module.exports = (app) => {
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (username, password, done) {
        try {
          const user = await User.findOne({ email: username });
          if (!user) {
            console.log("fallo el email");
            return done(null, false, { message: "Credenciales incorrectas" });
          }

          const passwordCheck = await user.passwordCheck(password);

          if (!passwordCheck) {
            console.log("fallo la contraseña");
            return done(null, false, { message: "Credenciales incorrectas" });
          }
          console.log("credenciales aprobadas");
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
