const express = require ('express');
const router = express.Router();
const utils = require('./utils');

//***********  GET /Temperaments  *************/
router.get('/', async (req, res) => {
   try {
    const temperaments = await utils.getAllTemper()

    if(temperaments.length === 0){
        res.status(405).send({ error : 'No se encontro ningun tipo de temperamento en la base de datos' })
    }else{
        res.status(201).send(temperaments)
    }
    
   } catch (error) {
    res.status(404).send({ error : error.message })
   }
})

module.exports = router