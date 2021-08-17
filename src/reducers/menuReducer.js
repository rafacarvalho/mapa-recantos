import { TOGGLE_MENU } from '../actions/types';

const initialState = {
    isMenuOpen: false,
    isScrollEnable: true
}

const menuReducer = (state = initialState, action) =>{
    switch(action.type){
        case TOGGLE_MENU:
            return{
                ...state,
                isMenuOpen: action.payload.menuStatus,
                isScrollEnable: action.payload.scrollStatus
            }
        default:
            return state;
    }
}

export default menuReducer;