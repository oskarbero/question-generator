import React, { Component } from 'react';
import {
    List,
    ListItem,
    Subheader,
    Divider,
    Toggle
} from 'material-ui';

import * as _ from 'lodash';
const fs = require('fs')

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
}

function parseJSON(response) {
    return response.json();
}

class SettingsMenu extends Component {
    constructor(props) {
        super(props);

        this.setCategoryActive.bind(this);
        this.updateActiveCategories.bind(this);

        fetch('/getCategories', {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json'
            })
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(this.updateActiveCategories.bind(this));

        this.state = {
            toggle: {}
        }
    }

    updateActiveCategories = (resp) => {
        this.setState(Object.assign({}, this.state, { toggle: resp }));
    }

    setCategoryActive = (category, event, isInputChecked) => {

        this.toggled = isInputChecked;
        const body = {};
        body[category] = isInputChecked;
        const settings = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        fetch('/setCategories', settings)
        .then(checkStatus)
        .then(parseJSON)
        .then(this.updateActiveCategories.bind(this)); 

    }


    buildRightToggle = (category) => {
        return (
            <Toggle
                toggled={this.state.toggle[category]}
                onToggle={this.setCategoryActive.bind(this,category)}
            />
        )
    }

    buildDrugCategoryList = () => {
        return Object.keys(this.props.drugList).map((category, idx) => {
            return (
                <div key={category}>
                    <ListItem
                        key={category}
                        primaryText={category}
                        rightToggle={this.buildRightToggle(category)}
                    />
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                <List>
                    <Subheader>Categories included</Subheader>
                    {this.buildDrugCategoryList()}
                </List>
            </div>
        )
    }
}

export default SettingsMenu;