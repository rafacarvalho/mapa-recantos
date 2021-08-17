import { TOGGLE_MENU } from './types';

export const toggleMenu = (status) => {
    return{
        type: TOGGLE_MENU,
        payload: status
    };
};
