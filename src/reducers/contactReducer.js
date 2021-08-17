import { SET_CONTACT_NAME, SET_CONTACT_EMAIL, SET_CONTACT_MESSAGE } from '../actions/types';

const initialState = {
    name: "",
    email: "",
    message: ""
}

const menuReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_CONTACT_NAME:
            return{
                ...state,
                name: action.payload,
            }
        case SET_CONTACT_EMAIL:
            return{
                ...state,
                email: action.payload,
            }
        case SET_CONTACT_MESSAGE:
            return{
                ...state,
                message: action.payload,
            }
        default:
            return state;
    }
}

export default menuReducer;