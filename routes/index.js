/**
 * No hay una única forma de organizar las rutas de un sitio web.
 * Una alternativa podría ser organizar las rutas por entidad:
 */

const userRoutes = require("./userRoutes");
// const articleRoutes = require("./articleRoutes");
// const commentRoutes = require("./commentRoutes");

/**
 * Otra alternativa podría ser organizar las rutas según su nivel de
 * privacidad (ej: si son rutas públicas o privadas).
 *
 * En `publicRoutes` podrían estar las rutas relacionadas con páginas como
 * Home, Contacto y Sobre Nosotros. En `privateRoutes` podrían estar las rutas
 * relacionados al Panel de Control (Admin). Notar que si se está construyendo
 * una API esta alternativa no tendría sentido.
 */

// const privateRoutes = require("./privateRoutes");
const tweetRoutes = require("./tweetRoutes");

module.exports = (app) => {
  /**
   * Notar que si el sitio está en español, tiene sentido que las URLs que se
   * ven en la barra de direcciiones del navegador también lo estén. No así los
   * nombres de variables, funciones, etc, que siempre se recomienda que estén
   * en inglés.
   */

  app.use("/usuarios", userRoutes);
  app.use("/tweets", tweetRoutes);
};

//Ejemplo Rutas de marcus
// const { Tweet } = require("../models");
// // Display a listing of the resource.
// async function index(req, res) {}
// // Display the specified resource.
// async function show(req, res) {}
// // Store a newly created resource in storage.
// async function store(req, res) {}
// // Update the specified resource in storage.
// async function update(req, res) {}
// // Remove the specified resource from storage.
// async function destroy(req, res) {}
// module.exports = {
//   index,
//   show,
//   store,
//   update,
//   destroy,
// };
