const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const{Dog} = require('../db')

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

    const expRegName = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/  // expreion regular para que solo se pueda recibir letras
    const expRegPosNum = /^[1-9]/ //Solo acepta numeros positivos

    let flag = expRegName.test(name)

    if(flag === false) res.status(403).send({error :  'el nombre de tu mascota no puede contener caracteres especiales ni numeros'})
    
    else if(!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !life_span || !temperaments) { // verifico que no falte ningun  dato
          //falta algun dato
          res.status(405).json({error : 'Faltan datos para poder realizar la carga'})
    } else { // si no falta ningun dato

            const flagminHei = expRegPosNum.test(minHeight)
            const flagmaxHei = expRegPosNum.test(maxHeight) //verifico que la altura no sea un numero negativo

            const flagminWei = expRegPosNum.test(minWeight)
            const flagmaxWei = expRegPosNum.test(maxWeight) //verifico que el peso no sea un numero negativo

            const flagLifSpa = expRegPosNum.test(life_span) //verifico que lifeSpan no sea un numero negativo
            const lifeSpToNum = Number(life_span) // paso life span a numero para verificar el rango y que sea numero

            const flagName = await Dog.findOne({where : {name : name}}) //verifico que el nombre no se repita en la base de datos

            if(!flagLifSpa  || lifeSpToNum === NaN || lifeSpToNum > 22 ){
                res.status(405).send({error : 'life span debe ser un numero y estar dentro del rngo de 1 a 22'})
                
            } 
            
            else if(!flagminHei || !flagmaxHei){
                res.status(405).send({error : 'La altura no puede ser un numero negativo'})
            }
            
            else if(!flagminWei || !flagmaxWei ){
                res.status(405).send({error : 'El peso no puede ser un numero negativo'})
            }
            
            else if(flagName){  // si el nombre existe no lo creo
                res.status(405).send({error : `Ya existe un perro con el nombre ${name} en la base de datos`})
                console.log(flagName)
            }
            
            else{
                
                 try {
                    await utils.postDog(name, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments) // si esta todo ok creo el perro
                    res.status(202).json({msj : `El perro ${name} Fue creado con exito`})
                } catch (error) {
                    res.status(405).send({error : error.message})
                }
            }



    }
});


module.exports = router