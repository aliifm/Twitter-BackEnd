const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);
router.get("/followers/:username", userController.userFollowers);
router.get("/following/:username", userController.userFollowing);

router.post("/", userController.store);

router.post("/:id/follow", userController.follow);

module.exports = router;
