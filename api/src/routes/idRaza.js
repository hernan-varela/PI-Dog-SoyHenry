const express = require('express')
const router = express.Router();
const utils = require('./utils')

router.get('/:id', async (req, res) =>{
   try {
    const {id} = req.params
    let dogsDb = await utils.getDogDb() //trigo todos los perros desde la base de datos
    const foundDb = dogsDb.find(d => d.id === id)
    if(foundDb) res.send(foundDb)
    else{
        let dogs = await utils.getDogsDetailsApi() //traigo los detalles de todos los perros de la api
        const dog =  dogs.find(d => d.id == id) 
        dog?res.status(201).send(dog) : res.status(405).send({error : `no existe el perro con el id ${id}`})
         
    }
   } catch (error) {
    res.status(402).send({error : error.message})
   }
 
    
})

module.exports = router