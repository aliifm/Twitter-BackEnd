const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/ensureAuthenticated");

router.use(isAuthenticated);
router.get("/", userController.index);
router.get("/followers/:username", userController.userFollowers);
router.get("/following/:username", userController.userFollowing);
router.get("/crear", userController.create);
router.get("/:username", userController.show);
router.post("/", userController.store);
router.get("/editar/:id", userController.edit);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);
router.post("/:id/follow", userController.follow);

module.exports = router;
