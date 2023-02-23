const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../../db.js");

//----------------------------------------------------------------------
// funcion asincrona para extraer toda la data de la API con las propiedades deseadas
async function getApiDogs(key) {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?limit=1000&api_key=${API_KEY}`
    );
    let dogs = await response.data.map((dog) => {
      return getJson(dog);
    });
    //si la key es true la data devuelta es un array de "temperaments" sin repetirse y ordenados alfabeticamente
    if (key){
      dogs = dogs.map(dog=>dog.temperament)
      dogs= dogs.reduce((acc, temperament) => {
        if (temperament) {
          return acc.concat(temperament.split(", "));
        } else {
          return acc;
        }
      }, []);
      const noDuplicatesArray = Array.from(new Set(dogs));
      dogs = noDuplicatesArray
      dogs.sort()
    }
    return dogs;
  } catch (error) {
    console.log(error.message);
    return "Data API error, not found";
  }
}
//----------------------------------------------------------------------
// funcion asincrona para buscar un nombre de raza de perro
async function getDog(name) {
  try {
    const dogsDb = await getDBdogs();
    const dogsApi = await getApiDogs();
    let allDogs = dogsApi.concat(dogsDb);
    allDogs = await allDogs.filter((e) => e.name === name);
    if (allDogs[0]) {
      return allDogs[0];
    } else {
      return `breed of dog whit name ${name}: NOT FOUND`;
    }
  } catch (error) {
    console.log(error.message);
    return "Data API error, not found";
  }
}
//----------------------------------------------------------------------
// funcion asincrona para toda la data raza de perro de la DB incluyendo sus temperaments
async function getDBdogs(){
  const findDB = await Dog.findAll({
    include: Temperament,
  });
  const convertJson = findDB.map((e) => e.toJSON());
  const dogsDB = convertJson.map((dog) => {
    const temperament = dog.temperaments.map((t) => t.temperament).join(", ");
    return {
      id: dog.id,
      name: dog.name,
      weight_min: dog.weight_min,
      weight_max: dog.weight_max,
      height_min: dog.height_min,
      height_max: dog.height_max,
      life: dog.life,
      image: dog.image,
      createdAt: dog.createdAt,
      temperament: temperament,
    };
  });
  return dogsDB
}
//----------------------------------------------------------------------
// funcion para llenar la tabla temperaments con los temperamentos obtenidos de la API
async function fillTable(){
  const temps = await getApiDogs(true);
// console.log(temps);
await temps.forEach(e=>{
  Temperament.create({temperament:e})
})
}

//----------------------------------------------------------------------
// funcion para extraer el valor minimo y maximo de la propiedad "weight" en medidas "metricas"
const extractWeightValues = (dog) => {
  const {
    weight: { metric },
  } = dog;
  const [min, max] = metric.split(" - ");
  return { min, max };
};
//----------------------------------------------------------------------
// funcion para extraer el valor minimo y maximo de la propiedad "height" en medidas "metricas"
const extracHeightValues = (dog) => {
  const {
    height: { metric },
  } = dog;
  const [min, max] = metric.split(" - ");
  return { min, max };
};
//----------------------------------------------------------------------
// funcion para verificar valores minimos y maximos, ademas de verificar que sean tipo numerico
const verifyValues = (vMin, vMax) => {
  if (typeof vMin === "string" || typeof vMax === "string") {
    throw new Error(
      "The values of Minimum Height, maximum Height, Minimum Weight and Maximum Weight must be NUMERIC"
    );
  }
  if (vMax <= vMin) {
    throw new Error(
      "ERROR: Minimum Height must be less than Maximum Height and Minimum Weight must be less than Maximum Weight"
    );
  }
};
//----------------------------------------------------------------------
//funcion para verificar si existe raza
async function verifyName(name) {
  let namesApi = await getApiDogs();
  namesApi = namesApi.map((e) => e.name);
  let nameDb = await Dog.findAll({
    attributes: ["name"],
  });
  const nameDbArray = nameDb.map((row) => row.dataValues.name);
  const allNames = namesApi.concat(nameDbArray);
  allNames.forEach((e) => {
    if (e === name) {
      console.log("POST request/dog: Duplicate NAME error");
      throw new Error("Dog breed name already exists");
    }
  });
}
//----------------------------------------------------------------------
//formato de objeto .JSON
const getJson = (dog) => {
  return {
    id: dog.id,
    name: dog.name,
    weight_min: extractWeightValues(dog).min,
    weight_max: extractWeightValues(dog).max,
    height_min: extracHeightValues(dog).min,
    height_max: extracHeightValues(dog).max,
    life: dog.life_span,
    image: dog.image.url,
    temperament: dog.temperament,
  };
};
//----------------------------------------------------------------------
module.exports = {
  extractWeightValues,
  extracHeightValues,
  getJson,
  verifyValues,
  getApiDogs,
  getDog,
  verifyName,
  fillTable,
  getDBdogs,
};
