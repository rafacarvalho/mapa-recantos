import { FETCH_MAP, SHOW_INFOWINDOW, INFOWINDOW_STATUS, LATLNG, SEARCH_LABEL, SEARCH_TERM, SEARCH_SUBMIT, SELECTED, TOPBUTTON } from '../actions/types';

const initialState = {
    latitude: -12.8993599,
    longitude: -38.40792729999998,
    zoom: 12,
    places: [],
    search: "",
    selected: null,
    infowindowIndex: null,
    isOpen: true,
    searchSubmit: false,
    topButtonClass: "btn btn-link hide" 
}

const mapReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_MAP:
            return{
                ...state,
                places: action.payload
            }
        case SHOW_INFOWINDOW:
            return{
                ...state,
                infowindowIndex: action.payload
            }
        case INFOWINDOW_STATUS:
            return{
                ...state,
                isOpen: action.payload
            }
        case LATLNG:
            return{
                ...state,
                latitude: action.payload.lat, 
                longitude: action.payload.lng,
                zoom: action.payload.zoom
            }
        case SEARCH_LABEL:
            return{
                ...state, 
                searchLabel: action.payload
            }
        case SEARCH_TERM:
            return{
                ...state, 
                search: action.payload
            }
        case SEARCH_SUBMIT:
            return{
                ...state,
                searchSubmit: action.payload,
            }
        case SELECTED:
            return{
                ...state,
                selected: action.payload,
            }
        case TOPBUTTON:
            return{
                ...state,
                topButtonClass: action.payload,
            }
        default:
            return state;
    }
}

export default mapReducer;