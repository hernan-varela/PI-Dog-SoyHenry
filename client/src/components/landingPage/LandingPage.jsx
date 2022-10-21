import React from "react";
import { Link } from "react-router-dom";
import Styles from './LandingPage.module.css'
import logo from '../../images/logo.png'
import huella from '../../images/huella.png'


export default function LandingPage (){
    return(
        <div className= {Styles.contenedorPincipal}>

            <div className = {Styles.contenedorIzq}>
                    <img className= {Styles.logo} src={logo} alt="img not found" />
                    <p className={Styles.texto} > 
                        Aqui podrás encontrar la raza de perros que mas se adapte a ti, 
                        podras elegir entre mas de 200 razas de perros y buscarlos según su temperamento,
                        nombre o raza, ademas podras crear a tu perro con caracteristicas personalizadas y 
                        guardarlo en nuestra base de datos
                    </p>
            </div>

            <div className= {Styles.contenedorDer} >
                <Link to={'/home'}>
                    <button className={Styles.btnStart} > <img className={Styles.huella}   src={huella} alt="img not found"  /> ingresar </button>
                 </Link>
            </div>



            
           
        </div>
    )
}