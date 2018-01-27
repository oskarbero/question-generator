import React, { Component } from 'react';
import {
    List,
    ListItem,
    Subheader,
    Divider,
    Toggle
} from 'material-ui';
import { apiGet, apiPost } from './Api';

class SettingsMenu extends Component {
    constructor(props) {
        super(props);

        this.setCategoryActive = this.setCategoryActive.bind(this);
        this.updateActiveCategories = this.updateActiveCategories.bind(this);
        this.toggleAllCategories = this.toggleAllCategories.bind(this);

        apiGet('/getCategories')
            .then(this.updateActiveCategories.bind(this));
        
        apiGet('/getDrugList')
            .then((resp) => {
                this.setState(Object.assign({}, this.state, {drugList: resp}));
            })

        this.state = {
            drugList: {},
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

        const resp = apiPost('/setCategories', body)
            .then(this.updateActiveCategories.bind(this));
    }

    toggleAllCategories = (event, isInputChecked) => {
        this.toggled = isInputChecked;
        const body = {
            TOGGLE_ALL: isInputChecked
        };
        Object.keys(this.state.drugList).forEach(val => body[val] = isInputChecked);
        const resp = apiPost('/setCategories', body)
            .then(this.updateActiveCategories.bind(this));
    }


    buildRightToggle = (category) => {
        return (
            <Toggle
                toggled={this.state.toggle[category]}
                onToggle={this.setCategoryActive.bind(this, category)}
            />
        )
    }

    buildDrugCategoryList = () => {
        return Object.keys(this.state.drugList).map((category, idx) => {
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
                <h1>Settings

                <Toggle
                    label={' '}
                    toggled={this.state.toggle['TOGGLE_ALL']}
                    onToggle={this.toggleAllCategories.bind(this)}

                // toggled={this.state.toggle[category]}
                // onToggle={this.setCategoryActive.bind(this, category)}
                />
        <Divider style={{ marginTop: '1%' }} />
                </h1>
                <List>
                    <Subheader>Categories included</Subheader>
                    {this.buildDrugCategoryList()}
                </List>
            </div>
        )
    }
}

export default SettingsMenu;