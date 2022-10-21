import React from "react";
import Styles from './Paginado.module.css'


export default function Paginado({DogsPerPage, allDogs, paginado}){ //me traigo esto de home
   const pageNumber= [] // me guarda un arreglo de numeros (las paginas)
   for(let i=1 ; i<= Math.ceil(allDogs/DogsPerPage); i++){ // me guarda la cantidad de paginas segun la cantuidad e perros
    pageNumber.push(i)
   }
    return(
      <nav>
        <ul className= {Styles.paginado}>
            {
                pageNumber && pageNumber.map( num =>{ // si esxiste el arreglo me renderiza cada uno de los elementos del arreglo
                 return(
                  <div className= {Styles.containerNumber}>
                    <li  key= {num} >
                      <a className={Styles.number} onClick={() => paginado(num)} > {num} </a>
                    </li>
                  </div>
                 )
                })
            }
        </ul>
      </nav>
    )
}