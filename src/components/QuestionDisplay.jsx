
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { apiGet } from './Api';
import { categoryQuestion, adrQuestion } from '../questionGenerator';

import '../stylesheets/App.css';


class QuestionDisplay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            displayAnswer: false,
            displayQuestion: false,
            questionType: this.props.questionType,
            displayPrompt: false,
            prompt: {}
        };

        const setInitialState = (active) => {
            this.setState(Object.assign({}, this.state, {
                drugList: active,
                numDrugCategories: Object.keys(active).length,
                displayPrompt: false,
            }))
        }
        this.generateQuestionContent = this.generateQuestionContent.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);

        apiGet('/getActiveDrugList')
            .then((resp) => {
                const active = {}
                for (const cat in resp.active) {
                    if (resp.active[cat]) {
                        active[cat] = resp.drugList[cat];
                    }
                }
                setInitialState(active);
            });
    }

    displayAnswer = () => {
        this.setState(Object.assign({}, this.state, {
            displayAnswer: true
        }));
    }

    generateQuestionContent = () => {
        if (this.state.numDrugCategories <= 0) {
            return;
        }
        let question;
        switch (this.props.questionType) {
            case 'ADRs':
                question = adrQuestion(this.state.drugList);
                break;
            default:
                question = categoryQuestion(this.state.drugList);
                break;
        }
        this.setState(Object.assign({}, this.state, { ...question }));
    }

    renderQuestionContent = () => {
        // Checks if we are displaying a new category - if so we do not display question until generate is clicked
        if (this.state.prompt && this.state.prompt.type === this.props.lastClicked) {
            return (
                <div>
                    <Divider style={{ marginBottom: '1%' }} />
                    <h2>Question:  {this.state.prompt.question}</h2>
                    <h2>Answer:    {this.state.displayAnswer ? this.state.prompt.answer : null} </h2>
                </div>
            );
        }
    };

    renderQuestion = () => (
        <div>
            <div>
                <h1>{this.props.questionType}</h1>
            </div>
            <div>
                {this.renderQuestionContent()}
                <div className="row">
                    <Divider style={{ marginBottom: '1%' }} />
                    <RaisedButton style={{ float: 'left' }} label="Answer" onClick={this.displayAnswer} />
                    <RaisedButton style={{ float: 'left' }} label="Generate" onClick={this.generateQuestionContent} />
                </div>
            </div>
        </div>
    );

    render() {
        return (
            <div>
                {this.renderQuestion()}
            </div>
        );
    };
}

export default QuestionDisplay;