/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 */

const { faker } = require("@faker-js/faker");
const User = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  const totalUsers = 20;

  for (let i = 0; i < totalUsers; i++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.name.middleName(),
      email: faker.internet.email(),
      password: 1234,
      description: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
    });
    users.push(user);
  }

  for (const user of users) {
    for (let i = 0; i < 19; i++) {
      const randomFollowing = users[faker.datatype.number({ min: 0, max: totalUsers - 1 })];
      const randomFollower = users[faker.datatype.number({ min: 0, max: totalUsers - 1 })];
      if (user._id !== randomFollowing._id) {
        user.following.push(randomFollowing);
      }
      if (user._id !== randomFollower._id) {
        user.followers.push(randomFollower);
      }
    }
    await user.save();
  }

  console.log("[Database] Se corrió el seeder de Users.");
};
