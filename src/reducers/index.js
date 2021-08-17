import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import menuReducer from './menuReducer';
import contactReducer from './contactReducer';


export default combineReducers({
    map: mapReducer,
    menu: menuReducer,
    contact: contactReducer
})
