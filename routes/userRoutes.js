const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);
router.get("/:id", userController.show); // informacion de usuario por id - tweets/tweet/seguidos/seguidores
router.post("/", userController.store); //
router.post("/:id/follow", userController.follow);

//rutas nuestras proyecto anterior
router.get("/followers/:username", userController.userFollowers); //
router.get("/following/:username", userController.userFollowing);

module.exports = router;

// router.get("/", controller.index);
// router.get("/:id", controller.show);
// router.post("/", controller.store);
