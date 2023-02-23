const { Temperament } = require("../db.js");

//controlador de solicitud GET a ruta /temperament
async function getTemp() {
  console.log("GET request /temperament: list all temperaments");
  const tempDb = await Temperament.findAll({attributes: ["temperament"]});
  const tempDbArray = tempDb.map((row) => row.dataValues.temperament);
  return tempDbArray
}

module.exports = { getTemp };
