import {
    SHOW_ANSWER,
    QUESTION_TYPE,
    GENERATE_QUESTION,
    MAIN_MENU_CLICK,
    RESET_QUESTION_DISPLAY,
} from '../actions';
import {
    RECEIVE_CONFIG,
    RECEIVE_DRUG_LIST,
    REQUEST_UPDATE_CONFIG,
    REQUEST_UPDATE_ALL_CONFIGS,
} from '../actions/asyncActions';
import {
    adrQuestion,
    categoryQuestion,
} from '../questionGenerator';

const initialState = {
    drugList: {},
    toggle: {},
    prompt: {
        question: '',
        answer: '',
        displayAnswer: false,
        displayPrompt: false,
        displayQuestion: false,
    },
    questionType: QUESTION_TYPE.CATEGORY,
}

const toggleAll = (state, action) => {
    const toggle = Object.keys(state.drugList).reduce((prevState, category) => {
        prevState[category] = action.status;
        return prevState;
    }, {})
    return toggle;
};

const setShowAnswer = (state) => {
    return { ...state, ...{ displayAnswer: true } }
}

const generateQuestion = (state) => {
    switch (state.questionType) {
        case QUESTION_TYPE.CATEGORY:
            return categoryQuestion(state.activeDrugList);
        case QUESTION_TYPE.ADR:
            return adrQuestion(state.activeDrugList);
        case QUESTION_TYPE.NONE:
        default:
            return initialState.prompt;
    }
}

const getActiveDrugs = (drugList, toggle) => {
    return Object.keys(drugList).reduce((prevState, category) => {
        if (toggle[category]) {
            prevState[category] = drugList[category];
        }
        return prevState;
    }, {})
}

const resolveQuestionType = (id) => (id === "Drug Category" ? "CATEGORY" : "ADRs");

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_DRUG_LIST:
            return { ...state, ...{ drugList: action.drugList, activeDrugList: getActiveDrugs(state.drugList, action.config) } }

        case RECEIVE_CONFIG:
        case REQUEST_UPDATE_CONFIG:
            return { ...state, ...{ toggle: action.config, activeDrugList: getActiveDrugs(state.drugList, action.config) } }

        case SHOW_ANSWER:
            return { ...state, ...{ prompt: setShowAnswer(state.prompt) } };

        case GENERATE_QUESTION:
            return { ...state, ...{ prompt: generateQuestion(state) } };

        case RESET_QUESTION_DISPLAY:
            return { ...state, ...{ prompt: initialState.prompt } }

        case MAIN_MENU_CLICK: 
            return { ...state, ...{menuItemClicked: action.id, questionType: resolveQuestionType(action.id)} }

        default:
            return state;
    }
}

export default rootReducer;