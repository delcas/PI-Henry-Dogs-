const { Dog } = require("../db.js");
const { getApiDogs } = require("./utils/utils.js");

//controlador de solicitud GET a ruta /dogs/:id

async function getID(id) {
  console.log("GET request /dogs/:ID get by breed ID");
  //buscar id en API y en DB
  const idDb = await Dog.findByPk(id);
  let dogsApi = await getApiDogs(false);
  dogsApi = dogsApi.filter((dog) => dog.id == id);
  //condicion si se enontro resultado
  if (dogsApi.length || idDb) {
    if (idDb) {
      //si el resultado esta en la DB obtener temperamentos de tablas asociadas por busqueda de ID y crear un solo objeto a retornar
      const dogSearch = idDb.getTemperaments().then((temperaments) => {
        let res = temperaments.map((e) => e.toJSON());
        res = res.map((e) => e.temperament);
        tempsString = res.join(", ");
        let dogDb = Object.values(idDb)[0];
        dogFinal = {
          ...dogDb,
          temperament: tempsString,
        };
        return dogFinal;
      });
      return dogSearch;
    } else {
      // si el resultado esta en la API retornarla
      return dogsApi[0];
    }
  } else {
    throw new Error(`No dog breed found with requested ID:${id}`);
  }
}

module.exports = { getID };
