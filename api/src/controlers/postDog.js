const { Dog, Temperament } = require("../db.js");
const { verifyValues, verifyName } = require("./utils/utils.js");

//controlador de solicitud POST a ruta /dogs
const postDog = async (data) => {
  const {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life,
    temperament,
  } = data;
  let { image } = data;
  if (!image) {
    image = "https://i.ibb.co/znL6nKy/dog-no-image.png";
  }
  //verificar si existe raza
  await verifyName(name);

  //verificar que sean valores numericos tanto peso como altura y verificar que minimos no sean mayores al los maximos
  verifyValues(height_min, height_max);
  verifyValues(weight_min, weight_max);

  if (name || height_min || height_max || weight_min || weight_max) {
    if (temperament) {
      console.log("POST request /dog: creating new dog with temperaments");
      const dogs = await Dog.create({
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life,
        image,
      });
      // convertir a array temperament obtenido por body
      arrayTemp = temperament.split(", ");
      // filtrar los ID de la tabla temperament
      Temperament.findAll({
        where: {
          temperament: arrayTemp,
        },
      })
        .then((temperaments) => {
          // filtrar ids de temperaments obtenidos
          const ids = temperaments.map((temperament) => temperament.id);
          //relacionar ids con tabla temperaments
          dogs.addTemperament(ids);
        })
        .catch((error) => {
          console.error(error);
        });

      //retornar mensaje y raza de perro creada
      let rest = Object.values(dogs)[0];

      dogCreated = [
        { msj: `Breed dog ${name} created` },
        {
          ...rest,
          temperament: temperament,
        },
      ];
      return dogCreated;
    } else {
      console.log("POST request /dog: creating new dog");
      const dogs = await Dog.create({
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life,
        image,
      });
      dogCreated = [{ msj: `Breed dog ${name} created` }, dogs];
      return dogCreated;
    }
  } else {
    console.log("POST request /dog: Error");
    throw new Error("No necessary information was sent");
  }
};

module.exports = { postDog };
