
import { connect } from 'react-redux';
import {generateQuestion,showAnswer} from '../actions'
import QuestionDisplay from '../components/QuestionDisplay'

const mapStateToProps = state => state; 
const mapDispatchToProps = dispatch => ({
    onGenerateClick: (type, drugList) => { dispatch(generateQuestion()) },
    onShowAnswerClick: (status) => { dispatch(showAnswer(status)) }
})

const QuestionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionDisplay);

export default QuestionContainer;