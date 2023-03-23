const User = require("../models/User");
const jwt = require("jsonwebtoken");

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGY3YmY5YWU0NTgxMzQzMWIyMWFhYiIsImlhdCI6MTY3ODgyNjUwMn0.XxEt0wILcT81cQfZpVVV3X0n_phOQjy5ARmDlSA3k8s

async function token(req, res) {
  // Validacion del usuario
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const checkHash = await user.passwordCheck(req.body.password);
    const token = jwt.sign({ id: user.id }, process.env.SESSION_SECRET);

    if (user && checkHash) {
      return res.json({ token: token, user: user });
    } else return res.json({ message: "El usuario no existe " });
  } else return res.json("No se pudo loguear");
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
