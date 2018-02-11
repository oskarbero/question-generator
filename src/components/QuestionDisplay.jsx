import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import '../stylesheets/App.css';


const TestQuestionDisplay = ({drugList, prompt, questionType, onGenerateClick, onShowAnswerClick }) => {
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
    return (
        <div>
            {/* <h1> Test Question Display </h1> */}
                <h1>{questionType}</h1>
            <div>
                {renderQuestionContent()}
                <div className="row">
                    <Divider style={{ marginBottom: '1%' }} />
                    <RaisedButton style={{ float: 'left' }} label="Answer" onClick={onShowAnswerClick} />
                    <RaisedButton style={{ float: 'left' }} label="Generate" onClick={onGenerateClick} />
                </div>
            </div>
        </div>
    )
}

export default TestQuestionDisplay;