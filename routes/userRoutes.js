const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");
//multer es una libreria de npm "https://www.npmjs.com/package/multer" 
//se usa para guardar archivos en la carpeta que se declara en server.js => "app.use("/uploads",express.static('uploads'));"

const multer = require('multer')
//esto es la configuracion que viene de la docu de npm multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
    filename: function (req, file, cb) {
      console.log(file);
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('avatar'), userController.store); //

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
