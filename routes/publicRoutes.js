const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

const isAuthenticated = require("../middlewares/ensureAuthenticated");
router.get("/", isAuthenticated, pagesController.showHome);
router.get("/login", pagesController.login);
router.get("/register", pagesController.register);
router.post("/registeruser", pagesController.registerPost);

router.get("*", function (req, res) {
  res.status(404).render("pages/404");
});

module.exports = router;
