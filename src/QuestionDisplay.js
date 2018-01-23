
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {apiGet, apiPost} from './Api';

import * as _ from 'lodash';

import { workbook } from './drugChart';

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
            displayPrompt: true,
            prompt: {}
        };

        const setInitialState = (active) => {
            this.setState(Object.assign({}, this.state, {
                drugList: active,
                numDrugCategories: Object.keys(active).length
            }))
        }


        apiGet('/getActiveDrugList')
            .then((resp) => {
                console.log(resp);
                const active = {}
                for(const cat in resp.active) {
                    if(resp.active[cat]){
                        active[cat] = resp.drugList[cat];
                    }
                }
                console.log(Object.keys(resp).length);
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

    buildGenerateAndAnswerButtons = () => (
        <div>
            <Divider style={{marginBottom: '1%'}} />
            <RaisedButton style={{float:'left'}} label="Answer" onClick={this.handleAnswerClick}/>
            <RaisedButton style={{float:'left'}} label="Generate" onClick={this.generateQuestion}/>
        </div> 
    );

    generateQuestion = () => { 
        console.log(this.state.drugList);
        if(this.state.numDrugCategories <= 0) {
            return;
        }
        const randoCatIdx = _.random(0, this.state.numDrugCategories - 1);
        const randomCategory = Object.keys(this.state.drugList)[randoCatIdx];
        const categoryData = this.state.drugList[randomCategory];
        const drug = categoryData[_.random(0, categoryData)] || {};
        const drugName = drug["DRUG NAME"];
        const category = drug["CATEGORY"];
    
        if(!drugName || !category) {
            return null;
        } 
    
        this.setState(Object.assign({}, this.state, {
            displayAnswer: false,
            displayQuestion: true,
            prompt: new Question(
                `What category does the drug "${drugName}" belong to?`,
                `${category}`,
                categoryData,
                drug
            )
        }));
    }

    showAnswer = () => {
        if(this.state.displayAnswer) {
            return ;
        }
    }

    renderDrugQuestionContent = () => {
        return (
            <div>
                <h1> Drug Category Questions </h1>
                <div hidden={!this.state.displayQuestion}>
                    <Divider style={{marginBottom: '1%'}} />
                    <h2>Question:  {this.state.prompt.question }</h2>
                    <h2>Answer:    {this.state.displayAnswer ? this.state.prompt.answer : null} </h2>
                </div>
                {this.buildGenerateAndAnswerButtons()}
            </div>
        );
    }

    displayQuestion = () => {
        if(this.state.displayPrompt) {
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