import {
    SHOW_ANSWER,
    QUESTION_TYPE,
    GENERATE_QUESTION,
    MAIN_MENU_CLICK,
    RESET_QUESTION_DISPLAY,
} from '../actions';
import {
    INVALIDATE_CONFIG,
    RECEIVE_CONFIG,
    RECEIVE_DRUG_LIST,
    REQUEST_UPDATE_CONFIG,
} from '../actions/asyncActions';
import {
    adrQuestion,
    usesQuestion,
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

const setShowAnswer = (state) => {
    return { ...state, ...{ displayAnswer: true } }
}

const generateQuestion = (state) => {
    switch (state.questionType) {
        case QUESTION_TYPE.USES: 
            return usesQuestion(state.activeDrugList);
        case QUESTION_TYPE.CATEGORY:
            return categoryQuestion(state.activeDrugList);
        case QUESTION_TYPE.ADR:
            return adrQuestion(state.activeDrugList);
        case QUESTION_TYPE.NONE:
        default:
            return initialState.prompt;
    }
}

const filterActiveDrugs = (drugList, toggle) => {
    return Object.keys(drugList).reduce((prevState, category) => {
        if (toggle[category]) {
            prevState[category] = drugList[category];
        }
        return prevState;
    }, {})
}

const resolveQuestionType = (id) => {
    switch(id) {
        case "Uses":
            return QUESTION_TYPE.USES;
        case "ADRs":
            return "ADRs";
        case "Drug Category": 
        default:
            return "CATEGORY";
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_DRUG_LIST:
            return { ...state, ...{ drugList: action.drugList} }

        case RECEIVE_CONFIG:
        case REQUEST_UPDATE_CONFIG:
            return { ...state, ...{ toggle: action.config, activeDrugList: filterActiveDrugs(state.drugList, action.config) } }

        case INVALIDATE_CONFIG:
            return { ...state, ...{ activeDrugList: filterActiveDrugs(state.drugList, state.toggle) } };

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