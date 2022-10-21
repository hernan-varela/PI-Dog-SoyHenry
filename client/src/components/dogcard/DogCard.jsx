import React from "react";
import Styles from './DogCard.module.css'

export default function DogCard({image, name, weight, temperaments}){
    return(
        <div className= {Styles.cardContainer}>

            <div  className={Styles.imagenFondo}> </div>

            <div className={Styles.containerImgDog}>
                < img className={Styles.img} src={image}  alt="img not found"/>  
            </div>    

            <h4>{name}</h4>
            
            <div >
                <p className= {Styles.weight}> peso : {weight} kg</p> 
                <p>Temperamento : {temperaments}</p>  
            </div>

            {/* <div className= {Styles.btnDetails} >
                <Link to={'/details'}>
                    <button className={Styles.btnStart} > <img className={Styles.huella}   src={huella} alt="img not found"  /> ingresar </button>
                 </Link>
            </div> */}
        </div>
    )
}