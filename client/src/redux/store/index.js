import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk  from "redux-thunk";
import rootReducer from "../reducers"; // me traigo mis reducers

 const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk))) 

 export default store

// ya con el store creado me voy al index de mi front, donde a traves del provider le asigno el store