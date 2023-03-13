const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */
router.post("/store", tweetController.tweet);
router.delete("/:id", tweetController.destroy);
router.post("/:id/like", tweetController.like);

module.exports = router;
