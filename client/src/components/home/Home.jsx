import React from "react";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {getDogs,getTemperaments} from "../../redux/actions";
import {Link} from "react-router-dom";
import Styles from "./Home.module.css";
import DogCard from "../dogcard/DogCard.jsx";
import Nav from "../nav/Nav.jsx";
import Paginado from '../paginado/Paginado.jsx';


export default function Home(){ 
   
    const dispatch  = useDispatch()  
    const allDogs = useSelector( (state) => state.dogs ) 
    
    
    
    //defino estados locales para el paginado
    const [currentPage, setCurrentPage] = useState(1) //estado con la pagina actal y uno que la setea esta en 1 porque mi paginado empieza en 1
    const [DogsPerPage, SetDogsPerPage] = useState(8) //setea cuantos perros quiero por pagina
    const indexOfLastDog = currentPage * DogsPerPage   //arranca en 8
    const indexOfFirstDog = indexOfLastDog - DogsPerPage // arranca en 0
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog)  //corto el arreglo que me trae el reducer con tods los personajes
    const paginado = (pageNumber ) =>{
        setCurrentPage(pageNumber)
    } //despues de estas configuraciones creo el componente de paginado


    useEffect(() => { // me traigo del estado los perros cuando el componente se monta
        dispatch( getDogs() ) // despacho la accion que me trae todos los personajes(es lo mismo que mapDistpachToprops)
        // dispatch(getTemperaments())
         
    },[])// En este arreglo van las dependencias como este componente no depende de nada lo dejo vacio


    return (
        <div>
         
            <Nav />
            
            <Paginado 
                DogsPerPage={DogsPerPage} 
                allDogs = {allDogs.length}
                paginado ={paginado}
            />

            <div className= {Styles.containerAllDogs}>
                {
                    currentDogs &&  currentDogs.map( d => 
                    <DogCard name={ d.name} image ={d.image} weight = {d.weight} temperaments ={d.temperament} />)
                }
            </div>
            
            
        </div>
    )
    
}