import { SET_CONTACT_NAME, SET_CONTACT_EMAIL, SET_CONTACT_MESSAGE  } from './types';

export const setContactName = (name) => {
    return{
        type: SET_CONTACT_NAME,
        payload: name
    };
};

export const setContactEmail = (email) => {
    return{
        type: SET_CONTACT_EMAIL,
        payload: email
    };
};

export const setContactMessage = (message) => {
    return{
        type: SET_CONTACT_MESSAGE,
        payload: message
    };
};
