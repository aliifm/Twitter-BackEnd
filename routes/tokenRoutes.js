const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */
router.post("/token", tokenController.index);

module.exports = router;
