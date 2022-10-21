import React from "react";
import logo from '../../images/logo.png';
import {Link} from "react-router-dom";
import {getTemperaments} from "../../redux/actions";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import Styles from "./Nav.module.css"
import Home from "../home/Home";


export default function Nav(){ 
    const dispatch  = useDispatch()  
    const alltemperaments = useSelector((state) => state.temperaments) 
    
    useEffect(() =>{
        dispatch(getTemperaments())
    }, [Home])
    
    
    return(
      
        <div className= {Styles.containerNav}>
           
            <img className={Styles.logo}  src= {logo} alt="img not found" />

            <Link className= {Styles.link} to={'/create'}> <h4 className= { Styles.createDog }>Create dog</h4></Link>

            <div className= {Styles.optionsFilter}>
                <h4>order by name</h4>
                <select >   
                    <option value="nameAsc"> Ascendente</option>
                    <option value="nameDesc">Descendente</option>
                </select>
            </div>


            <div className= {Styles.optionsFilter}>
                <h4>order by weight</h4>
                <select > 
                    <option value="pesoAsc"> Ascendente</option>
                    <option value="pesoDesc">Descendente</option>
                </select>
            </div>
            
            <div className= {Styles.optionsFilter} >
                <h4> Sources </h4>
                <select>
                    <option value="todos">todos</option>
                    <option value="creados">creados</option>
                    <option value="existentes">existentes</option>
                </select>
            </div>
           
            <div className= {Styles.optionsFilter} >
                <h4> filter by temperaments </h4>
                <select > 
                <option value="all">All Temperaments</option>
                    {
                        alltemperaments && alltemperaments.map( t => {
                            return( <option value = {t.name}>  {t.name}  </option>)
                        })
                    }
                </select>
            </div>
            

            
            
        </div>
    )
}