/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

const User = require("../models/User");
const Tweet = require("../models/Tweet");
const formidable = require("formidable");

async function showHome(req, res) {
  const users = await User.find();
  const tweets = await Tweet.find().populate("userId").sort({ createdAt: -1 }).limit(20);
  return res.render("pages/home", { tweets, users });
}

async function login(req, res) {
  return res.render("pages/login");
}

async function register(req, res) {
  return res.render("pages/register");
}

async function registerPost(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const user = new User({
      firstname: fields.firstname,
      lastname: fields.lastname,
      username: fields.username,
      email: fields.email,
      password: fields.password,
      avatar: files.avatar.newFilename,
    });
    await user.save();
    return res.redirect("/login");
  });
}

async function showContact(req, res) {
  return res.render("pages/contact");
}

async function showAboutUs(req, res) {
  return res.render("pages/aboutUs");
}

async function show404(req, res) {
  return res.status(404).render("pages/404");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  login,
  register,
  showContact,
  showAboutUs,
  registerPost,
};
