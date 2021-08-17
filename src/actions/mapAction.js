import { FETCH_MAP, SHOW_INFOWINDOW, INFOWINDOW_STATUS, LATLNG, SEARCH_LABEL, SEARCH_TERM, SEARCH_SUBMIT, SELECTED, TOPBUTTON } from './types';
import places from '../app/teste.json'

export const fetchMap = () => dispatch => {    
    dispatch({
        type: FETCH_MAP,
        payload: places
    });
};

export const showInfowindowAtIndex = (index) => dispatch => {    
    dispatch({
        type: SHOW_INFOWINDOW,
        payload: index
    });
};

export const setInfowindowStatus = (status) => dispatch => { 
    dispatch({
        type: INFOWINDOW_STATUS,
        payload: status
    });
};

export const setMapLatLng = (coords) => dispatch => {    
    dispatch({
        type: LATLNG,
        payload: coords
    });
};

export const setSearchLabel = (label) => dispatch => {
    dispatch({
        type: SEARCH_LABEL,
        payload: label
    })
};

export const setPlaceSearch = (s) => dispatch => {
    dispatch({
        type: SEARCH_TERM,
        payload: s
    })
};

export const submitSearch = (s) => dispatch => {
    dispatch({
        type: SEARCH_SUBMIT,
        payload: s
    })
};

export const setSelectedPlace = (s) => dispatch => {
    dispatch({
        type: SELECTED,
        payload: s
    })
};

export const setTopButtonClass = (s) => dispatch => {
    dispatch({
        type: TOPBUTTON,
        payload: s
    })
};