const { Dog, Temperament } = require("../db.js");
const { getDog, getApiDogs,getDBdogs } = require("./utils/utils.js");

//controlador de ruta /dogs y /dogs?name="..."
const getDogs = async (name) => {
  if (name) {
    console.log(`GET dog name request ${name}`);
    return getDog(name);
  } else {
    console.log("GET all dogs request");
    // obtener todos los datos de la DB obteniendo sus temperaments de la tabla asociada
    const dogsDb = await getDBdogs()
    //obtener todos los datos de la API
    const dogsApi = await getApiDogs(false);
    //concatenar resultados y retornarlos
    return dogsApi.concat(dogsDb);
  }
};

module.exports = { getDogs };
