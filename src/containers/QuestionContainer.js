
import { connect } from 'react-redux';
import {generateQuestion,showAnswer} from '../actions/questionDisplayActions'
import QuestionDisplay from '../components/QuestionDisplay';

const initialState = {
    drugList: {},
    prompt: {
        showAnswer: false,
        showPrompt: false,
        showQuestion: false
    },
    questionType: 'Category'
}

const mapStateToProps = (state = initialState, ownProps) => {
    return {
        drugList: state.drugList,
        prompt: {
            ...state.questionPrompt
        }
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGenerateClick: (type) => dispatch(generateQuestion(type)),
        onShowAnswerClick: (status) => dispatch(showAnswer(status))
    }
}


const QuestionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionDisplay);

export default QuestionContainer;