import {
    SHOW_ANSWER,
    QUESTION_TYPE,
    GENERATE_QUESTION,
} from '../actions'
import {
    adrQuestion,
    categoryQuestion,
} from '../questionGenerator'

const initialState = {
    questionType: '',
    prompt: {
        question: '',
        answer: '', 
        displayAnswer: false,
        displayPrompt: false,
        displayQuestion: false,
        questionType: 'No Category'
    }
}


const questionDisplayReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_ANSWER: 
            return { ...state, setShowAnswer(state)}
        case GENERATE_QUESTION:
            return { ...state, generateQuestion(state, action)}
    }
}

const setShowAnswer = (state) => {
    return { ...state.questionPrompt, ...{showAnswer: true}};
}

const generateQuestion = (state, action) => {
    switch(action.id) {
        case QUESTION_TYPE.CATEGORY:
            return  {...state.questionPrompt, ...categoryQuestion(state.drugList)}
        case QUESTION_TYPE.ADR: 
            return {...state.questionPrompt, ...adrQuestion(state.drugList)}
        case QUESTION_TYPE.NONE:
        default:
            return state
    }
}