import axios from "axios";
import {GET_DOGS, GET_TEMPERAMENTS} from '../actions-types'

export function getDogs(){
    return async function(dispatch){  //retorna una funcion que recibe el dispatch por parametro
        let json = await axios.get('http://localhost:3001/dogs') //traigo la info de mi back
        return dispatch({ //esta funcion retorna la action con la info y su tipo
            type : GET_DOGS,
            payload : json.data
        })
    }

}


export function getTemperaments(){  // me tare todos los temperamentos desde el back
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/temperaments')
        return dispatch({
            type : GET_TEMPERAMENTS,
            payload : json.data
        })
    }
}