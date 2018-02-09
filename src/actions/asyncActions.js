
import {getConfig, setConfig, getDrugList} from '../components/Api.js';
/**
 *  Async GET actions for CONFIG
 */
export const REQUEST_CONFIG = 'REQUEST_CONFIG'
function requestConfig() {
    return {
        type: REQUEST_CONFIG,
    }
}

export const RECEIVE_CONFIG = 'RECEIVE_CONFIG'
function receiveConfig(config) {
    return {
        type: RECEIVE_CONFIG,
        config: JSON.parse(config),
        receivedAt: Date.now()
    }
}

export const INVALIDATE_CONFIG = 'INVALIDATE_CONFIG'
export function invalidateConfig() {
    return {
        type: INVALIDATE_CONFIG,
    }
}

export function fetchConfig() {
    return dispatch => {
        // Let's the state know we are currently fetching configs
        dispatch(requestConfig());
        // Returns the state
        return getConfig().then(response => dispatch(receiveConfig(response.Body)))
    }
}


/**
 * Async POST actions for Config
 */
export const REQUEST_UPDATE_CONFIG = 'REQUEST_UPDATE_CONFIG'
function requestUpdateConfig(config) {
    return {
        type: REQUEST_UPDATE_CONFIG,
        config
    }
}

export const REQUEST_UPDATE_ALL_CONFIGS = 'REQUEST_UPDATE_ALL_CONFIGS'
function requestUpdateAllConfigs(status) {
    return {
        type: REQUEST_UPDATE_ALL_CONFIGS,
        status
    }
}

export function updateActiveCategory(active, id, status) {
    return dispatch => {
        const newConfig = {...active, [id]: status};
        // We opt for switching local state before sending off to datastore
        // This should result in better responsiveness and the data is not critical (as of now)
        dispatch(requestUpdateConfig(newConfig))
        return setConfig(newConfig).then((resp) => console.log('Set one config', resp)) 
    }
}

export function updateAllCategories(drugList, status) {
    return dispatch => {
        const newConfig = Object.keys(drugList).reduce((prev, category) => {
            prev[category] = status
            return prev;
        }, {});

        dispatch(requestUpdateAllConfigs(newConfig))
        return setConfig(newConfig).then(console.log.bind(this, 'Set all configs'));
    }
}


/** 
 *  Async GET actions for Drug List
 */
export const REQUEST_DRUG_LIST = 'REQUEST_DRUG_LIST'
function requestDrugList() {
    return {
        type: REQUEST_DRUG_LIST,
    }
}

export const RECEIVE_DRUG_LIST = 'RECEIVE_DRUG_LIST'
function receiveDrugList(drugList) {
    return {
        type: RECEIVE_DRUG_LIST,
        drugList: JSON.parse(drugList),
        receivedAt: Date.now()
    }
}

export function fetchDrugList() {
    return dispatch => {
        // Let's the state know we are currently fetching configs
        dispatch(requestDrugList());
        // Returns the state
        return getDrugList().then(response => dispatch(receiveDrugList(response.Body)))
    }
}