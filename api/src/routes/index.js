const { Router } = require('express');
// Importar todos los routers;

const {getDogs}= require("../controlers/getDogs.js");
const { getID } = require('../controlers/getDogsId.js');
const { getTemp } = require('../controlers/getTemperament.js');
const {postDog}= require("../controlers/postDog.js");
const { fillTable } = require('../controlers/utils/utils.js');

const router = Router();

//llenar la tabla temperaments
try {
  fillTable()
} catch (error) {
  console.log(error.message);
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs',async (req,res)=>{
  const {name}=req.query
  try {
    res.status(200).json(await getDogs(name))
  } catch (error) {
    res.status(404).json({ err: error.message } );
  }
})

router.get('/dogs/:idRaza',async (req,res)=>{
  const {idRaza}=req.params
try {
  res.status(200).json(await getID(idRaza))
} catch (error) {
  res.status(404).json({ err: error.message } );
}
})


router.post('/dogs', async (req,res)=>{
  const data=req.body
try {
  res.status(200).json(await postDog(data))
} catch (error) {
  res.status(400).json({ err: error.message } );
}
})


router.get('/temperament',async (req,res)=>{
  try {
    res.status(200).json(await getTemp())
  } catch (error) {
    res.status(404).json({ err: error.message } );
  }
})

module.exports = router;
