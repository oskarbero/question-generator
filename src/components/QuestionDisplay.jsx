
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import { apiGet, apiPost } from './Api';
import {randomCategoryQuestion, ADRQuestion} from '../questionGenerator';

import * as _ from 'lodash';

function Question(question, answer, rawData, answerData) {
    this.question = question || "";
    this.answer = answer || "";
    this.fullData = rawData || {};
    this.answerData = answerData || {};
}

class QuestionDisplay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: '',
            displayAnswer: false,
            displayQuestion: false,
            questionType: 'category',
            displayPrompt: true,
            prompt: {}
        };

        const setInitialState = (active) => {
            this.setState(Object.assign({}, this.state, {
                drugList: active,
                numDrugCategories: Object.keys(active).length
            }))
        }
        this.handleQuestionTypeChange = this.handleQuestionTypeChange.bind(this);
        this.generateQuestion = this.generateQuestion.bind(this);

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

    handlePromptInput = (event, index, value) => {
        this.setState(Object.assign({}, this.state, {
            value,
        }));
    };

    handleAnswerClick = (event, index) => {
        this.setState(Object.assign({}, this.state, {
            displayAnswer: true
        }));
    }

    handleQuestionTypeChange = (event, index, value) => {
        this.setState(Object.assign({}, this.state, {
            questionType: value
        }));
    }

    buildGenerateAndAnswerButtons = () => (
        <div>
            <Divider style={{ marginBottom: '1%' }} />
            <RaisedButton style={{ float: 'left' }} label="Answer" onClick={this.handleAnswerClick} />
            <RaisedButton style={{ float: 'left' }} label="Generate" onClick={this.generateQuestion} />
            <DropDownMenu value={this.state.questionType} onChange={this.handleQuestionTypeChange} openImmediately={true}>
                <MenuItem value={'category'} primaryText="category" />
                <MenuItem value={'ADR'} primaryText="ADR" />
            </DropDownMenu>
        </div>
    );

    generateQuestion = () => {
        if (this.state.numDrugCategories <= 0) {
            return;
        }
        switch(this.state.questionType) {
            case 'ADR':
                return ADRQuestion(this.state.drugList); 
            default: 
                return this.generateCategoryQuestion();
        }
    }

    generateCategoryQuestion = () => {
        const question = randomCategoryQuestion(this.state.drugList);
        this.setState(Object.assign({}, this.state, question));
    }

    showAnswer = () => {
        if (this.state.displayAnswer) {
            return;
        }
    }

    renderQuestion = () => {
        switch (this.state.questionType) {
            case 'ADR':
                return (
                    <div>
                        <h1>Hello ADR question</h1>
                        <div hidden={!this.state.displayQuestion}>
                            <Divider style={{ marginBottom: '1%' }} />
                            <h2>Question:  {this.state.prompt.question}</h2>
                            <h2>Answer:    {this.state.displayAnswer ? this.state.prompt.answer : null} </h2>
                        </div>
                    </div>
                );
            default:
                return (
                    <div>
                        <h1> Drug Category Questions </h1>
                        <div hidden={!this.state.displayQuestion}>
                            <Divider style={{ marginBottom: '1%' }} />
                            <h2>Question:  {this.state.prompt.question}</h2>
                            <h2>Answer:    {this.state.displayAnswer ? this.state.prompt.answer : null} </h2>
                        </div>
                    </div>
                );
        }
    }

    renderDrugQuestionContent = () => {
        return (
            <div>
                {this.renderQuestion()}
                {this.buildGenerateAndAnswerButtons()}
            </div>
        );
    }

    displayQuestion = () => {
        if (this.state.displayPrompt) {
            return this.renderDrugQuestionContent();
        }
        else {
            return this.buildGenerateAndAnswerButtons();
        }
    };


    render() {
        return (
            <div>
                {this.displayQuestion()}
            </div>
        );
    };
}

export default QuestionDisplay;