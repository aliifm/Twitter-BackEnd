const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.post("/", userController.store); //
router.use(checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }));
router.get("/:username", userController.show); // informacion de usuario por id - tweets/tweet/seguidos/seguidores
router.post("/:id/follow", userController.follow);
router.get("/:id/userFollow", userController.userFollowStatus);

//rutas nuestras proyecto anterior
router.get("/followers/:username", userController.userFollowers); //
router.get("/following/:username", userController.userFollowing);

module.exports = router;

// router.get("/", controller.index);
// router.get("/:id", controller.show);
// router.post("/", controller.store);
