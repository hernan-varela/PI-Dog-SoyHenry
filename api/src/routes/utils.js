const axios = require('axios');
const {Sequelize} = require('sequelize')
const{Dog,Temper} = require('../db')

//************************* trae a todos los perros solo con los datos solicitados para la ruta principal desde la API *************************
const getDogsApi = async (name) =>{
   try {
    const dataApi = await axios.get('https://api.thedogapi.com/v1/breeds')
    const dogsApi = dataApi.data.map(dog =>{
      return {
        id :  dog.id,
        name : dog.name,
        temperament : dog.temperament,
        image : dog.image.url,
        weight : dog.weight.metric,

      }
    })  

    return dogsApi;
    
   } catch (error) {
     return {error: error.message}
   }
};



//************************* retorna un solo perro buscado por query *************************
// const getDogName = async (name) =>{
//     const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
//     const dogData = dogApi.data;
//     return {
//         id : dogData[0].id,
//         name : dogData[0].name,
//         temperament : dogData[0].temperament,
//         weight : dogData[0].weight.metric
//     }
// }
//Busca y retorna imagen de un perro a traves de el id de la imagen
// const getImgDog = async(id) => {
//     const dogApi = await axios.get()
// } 
//No lo use porque me parece poco eficiente ya que tengo que hacer 2 axios.get uno para la info y otro para la imagen


//************************* retorna todos los perros de  la base de datos *************************
const getDogDb = async () => {
  try {
    let dogs = await Dog.findAll({
      include : { 
        model : Temper,
        attributes : ['name'],
    },

        through:{
          attributes : [],
      }
      
    })

    return dogs
  } catch (error) {
    return {error : error.message}
  }
};



//************************* Retorna un array con los perros de la base de datos y los de la API *************************
const getAllDogs = async () => {
    const dogApi = await getDogsApi()
    const dogsDb = await getDogDb()
    const allDog = dogApi.concat(dogsDb)
    return allDog;
    
}


// ************crea en la base de datos todos los temperamentos posibles *************************
const CreateTempDb = async ( listDogs) => {
  try {
    const listTemp = listDogs.map(dog => dog.temperament) //retorna lista con strings con trmperamentos separadas por ','
    const filterTemper = [];
   
    for (const tempers of listTemp) {
     if(tempers){ var listAux = tempers.split(',') }
     for (const temp of listAux) {
       filterTemper.push(temp)
     }
    }
    
    filterTemper.sort()
    for (const temp of filterTemper) {
     await Temper.findOrCreate({where : {name : temp.trim()}}) //hay temperamentos que se repiten por los espacion en blanco por eso el trim
    }
  } catch (error) {
    res.status.send({error : error.message})
  }
}



//************************* retorna todos los temperamentos posibles *************************
const getAllTemper = async () =>{
  const temperaments = await Temper.findAll()
  return temperaments
}


/*********************** Retorna detalles de todos los perros ******************************/
const getDogsDetailsApi = async () => {
  const dataApi = await axios.get('https://api.thedogapi.com/v1/breeds')
  
  const dogsApi = dataApi.data.map(dog =>{
    return {
        id :  dog.id,
        name : dog.name,
        temperament : dog.temperament,
        image : dog.image.url,
        weight : dog.weight.metric,
        life_span : dog.life_span,
        height : dog.height.metric,
        origin : dog.origin,
        bred_for : dog.bred_for

    }
})  
  return dogsApi
}  


/***********************  crea perros en la base de datos  ******************************/
const postDog = async (name, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments) =>{
  const dog = await Dog.create({name, minHeight, maxHeight, minWeight, maxWeight, life_span, }) //creo el perro en la base de datos con los datos que llegan por parametros

  
  const temperDog = await Temper.findAll({
    where: {
    name: {
      [Sequelize.Op.in]: temperaments
    }
  }})
  dog.addTemper(temperDog) 

}



module.exports = {
    getAllDogs,
    CreateTempDb, 
    getAllTemper,
    getDogsDetailsApi,
    getDogDb,
    postDog
}