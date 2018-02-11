
import { connect } from 'react-redux';
import {generateQuestion,showAnswer} from '../actions'
import TestQuestionDisplay from '../components/TestQuestionDisplay'


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGenerateClick: (type, drugList) => {dispatch(generateQuestion())},
        onShowAnswerClick: (status) => {dispatch(showAnswer(status))}
    }
}


const QuestionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestQuestionDisplay);

export default QuestionContainer;