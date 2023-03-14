const Tweet = require("../models/Tweet");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function token(req, res) {
  const token = jwt.sign({ info: "Data" }, "Secreto");
  return res.json({ token });
}

// const user = await User.findOne({ email: req.body.email });
// const checkHash = await user.passwordCheck(req.body.password);
// if (user && checkHash) {

//   // aca va jwt.sing
//   return res.json(user); //OJO -modo prueba- aca estamos enviando pw al front -

// } else {
//   return res.json("No existe este usuario");
// }
module.exports = {
  token,
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

// router.get("/", controller.index);
// router.get("/:id", controller.show);
// router.post("/", controller.store);
// router.patch("/:id", controller.update);
// router.delete("/:id", controller.destroy);
