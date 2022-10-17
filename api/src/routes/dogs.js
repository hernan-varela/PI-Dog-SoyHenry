const { json } = require('body-parser');
const express = require('express')
const router = express.Router();

const utils = require('./utils');



//*****   GET /dogs y  /dog?name=lll   ***** */
router.get('/', async (req, res) => {

    try {
        const {name} = req.query 
        
    
        const allDogs = await utils.getAllDogs() //es una array con todos los perros de la api y de la base de datos
        utils.CreateTempDb(allDogs)  //creo los temperamentos en la base de datos
        if(name){
             found = allDogs.find( d => name.toLowerCase() === d.name.toLowerCase())
            found?res.status(201).send(found) : res.status(420).send({ error:  `No existe una raza o un perro con el nombre ${name}`})
        
        }else {
            res.send(allDogs)
        }
    } catch (error) {
        res.status(402).send({error : error.message})
    }

});



//************* POST dogs/create ***************/
router.post('/create', async (req, res) => {
    const {name, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments} = req.body 
    if(!name, !minHeight, !maxHeight, !minWeight, !maxWeight, !life_span, !temperaments) {
          //falta algun dato
          res.status(405).json({error : 'Faltan datos para poder realizar la carga'})
    } else {
       try {
        await utils.postDog(name, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments) // creo el perro
        res.status(202).json({msj : `El perro ${name} Fue creado con exito`})
       } catch (error) {
         res.status(405).send({error : error.message})
       }

    }
});


module.exports = router