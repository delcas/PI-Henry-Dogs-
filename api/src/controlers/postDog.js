const { Dog, Temperament } = require("../db.js");
const { verifyValues, verifyName } = require("./utils/utils.js");

//controlador de solicitud POST a ruta /dogs
const postDog = async (data) => {
  const {name, height_min, height_max, weight_min, weight_max, life, image, temperament,} = data;
  //verificar si existe raza
  await verifyName(name);

  //verificar que sean valores numericos tanto peso como altura y verificar que minimos no sean mayores al los maximos
  verifyValues(height_min, height_max);
  verifyValues(weight_min, weight_max);

  if (name || height_min || height_max || weight_min || weight_max) {
    if (temperament) {
      console.log("POST request /dog: creating new dog with temperaments");
      const dogs = await Dog.create({name, height_min, height_max, weight_min, weight_max, life, image,});
      // convertir a array temperament obtenido por body
      arrayTemp = temperament.split(", ");
      // filtrar los ID de la tabla temperament
      Temperament.findAll({
        where: {
          temperament: arrayTemp,
        },
      })
        .then((temperaments) => {
          const ids = temperaments.map((temperament) => temperament.id);
          //relacionar ids con tabla temperaments
          dogs.addTemperament(ids);
          // console.log(ids);
        })
        .catch((error) => {
          console.error(error);
        });

      //retornar raza de perro creada
      let rest = Object.values(dogs)[0];
      dogCreated = {
        ...rest,
        temperament: temperament,
      };
      return dogCreated;
    } else {
      console.log("POST request /dog: creating new dog");
      const dogs = await Dog.create({name, height_min, height_max, weight_min, weight_max, life, image,});
      return dogs;
    }
  } else {
    console.log("POST request /dog: Error");
    throw new Error("No necessary information was sent");
  }
};

module.exports = { postDog };
