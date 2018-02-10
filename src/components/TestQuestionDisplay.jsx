import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { categoryQuestion, adrQuestion } from '../questionGenerator';
import '../stylesheets/App.css';


const TestQuestionDisplay = ({ questionType, prompt, onGenerateClick, onShowAnswerClick }) => {
    const renderQuestionContent = () => {
        if(prompt && prompt.displayPrompt) {
            <div>
                <Divider style={{ marginBottom: '1%' }} />
                <h2>Question:  {prompt.question}</h2>
                <h2>Answer:    {prompt.displayAnswer ? prompt.answer : undefined} </h2>
            </div>
        }
    }
    return (
        <div>
            <h1> Test Question Display </h1>
            <div>
                <h1>{prompt ? prompt.questionType : 'Ooops looks like this question type doesn\'t exist'}</h1>
            </div>
            <div>
                {renderQuestionContent()}
                <div className="row">
                    <Divider style={{ marginBottom: '1%' }} />
                    <RaisedButton style={{ float: 'left' }} label="Answer" onClick={onGenerateClick} />
                    <RaisedButton style={{ float: 'left' }} label="Generate" onClick={onShowAnswerClick} />
                </div>
            </div>
        </div>
    )
}

export default TestQuestionDisplay;