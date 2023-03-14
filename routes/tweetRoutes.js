const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */
router.get(
  "/show",
  checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }),
  tweetController.show,
);
router.post("/store", tweetController.tweet);
router.delete("/:id", tweetController.destroy);
router.post("/:id/like", tweetController.like);

module.exports = router;

// router.get("/", controller.index);
// router.get("/:id", controller.show);
// router.post("/", controller.store);
// router.patch("/:id", controller.update);
// router.delete("/:id", controller.destroy);
