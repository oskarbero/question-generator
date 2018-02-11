
import { connect } from 'react-redux';
import {generateQuestion,showAnswer} from '../actions'
import QuestionDisplay from '../components/QuestionDisplay'


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
)(QuestionDisplay);

export default QuestionContainer;