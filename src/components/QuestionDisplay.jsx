import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader'
import '../stylesheets/App.css';


const QuestionDisplay = ({
    drugList,
    activeDrugList,
    prompt,
    questionType,
    onGenerateClick,
    onShowAnswerClick
}) => {
    const renderQuestionContent = () => {
        if (prompt && prompt.displayPrompt) {
            return (
                <div>
                    <Divider style={{ marginBottom: '1%' }} />
                    <h2>Question:  {prompt.question.question}</h2>
                    <h2>Answer:    {prompt.displayAnswer ? prompt.question.answer : undefined} </h2>
                </div>
            )
        }
    }

    const getCategoriesSelectedSubheader = () => (
        <Subheader>
            {`${Object.keys(activeDrugList).length} of ${Object.keys(drugList).length} categories selected`}
        </Subheader>
    )

    const styles = {
        flex: {
            display: 'flex',
            alignItems: 'baseline'
        },
        raisedButton: {
            marginRight: '5px'
        }
    }

    return (
        <div className="sub-wrapper">
            <div className="sub-header" style={styles.flex}>
                <h1>{questionType}</h1>
                {getCategoriesSelectedSubheader()}
            </div>
            <div className="sub-content">
                {renderQuestionContent()}
            </div>
            <Divider style={{ marginBottom: '1%' }} />
            <div className="sub-footer" style={styles.flex}>
                <RaisedButton style={styles.raisedButton} label="Answer" onClick={onShowAnswerClick} />
                <RaisedButton style={styles.raisedButton} label="Generate" onClick={onGenerateClick} />
            </div>
        </div>
    )
}

export default QuestionDisplay;