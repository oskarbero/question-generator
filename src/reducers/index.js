import { combineReducers } from 'redux';
import {
    TOGGLE_ALL_CATEGORIES,
} from '../actions'
import { 

    RECEIVE_CONFIG,
    RECEIVE_DRUG_LIST,
    REQUEST_UPDATE_CONFIG,
    REQUEST_UPDATE_ALL_CONFIGS,
} from '../actions/asyncActions'

const initialState = {
    drugList: {},
    toggle: {}
}

const toggleAll = (state, action) => {
    const toggle = Object.keys(state.drugList).reduce((prevState, category) => {
        prevState[category] = action.status;
        return prevState;
    }, {})
    return toggle;
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_DRUG_LIST:
            return { ...state, ...{drugList: action.drugList}}
        case RECEIVE_CONFIG:
        case REQUEST_UPDATE_CONFIG:
            return { ...state, ...{toggle: action.config}}
        case TOGGLE_ALL_CATEGORIES:
        case REQUEST_UPDATE_ALL_CONFIGS:
            return { ...state, ...{toggle: toggleAll(state)}};
        default:
            return state;
    }
}
export default rootReducer;