import React, { Component } from 'react';
import {
    List,
    ListItem,
    Subheader,
    Divider,
    Toggle
} from 'material-ui';
import { setConfig, getDrugList, getConfig } from './Api';

class SettingsMenu extends Component {
    constructor(props) {
        super(props);

        this.setCategoryActive = this.setCategoryActive.bind(this);
        this.updateActiveCategories = this.updateActiveCategories.bind(this);
        this.toggleAllCategories = this.toggleAllCategories.bind(this);

        function updateConfig(resp) {
            this.setState(Object.assign({}, this.state, { toggle:  JSON.parse(resp.Body) }));
        }
        function updateDrugList(resp) {
            this.setState(Object.assign({}, this.state, { drugList:  JSON.parse(resp.Body) }));
        }
        getConfig().then(updateConfig.bind(this)); 

        getDrugList().then(updateDrugList.bind(this))

        this.state = {
            drugList: {},
            toggle: {}
        }
    }
    updateConfig(newConf) {
        this.setState(Object.assign({}, this.state, {toggle: newConf}));
    }
   
    updateActiveCategories = (resp) => {
        const bodyResp = JSON.parse(resp.Body)
        const newState = Object.assign({}, this.state, { toggle:  bodyResp, drugList: this.state.drugList ? this.state.drugList : bodyResp });
        this.setState(newState);
    }
    
    setCategoryActive = (category, event, isInputChecked) => {
        this.toggled = isInputChecked;
        const newSetting = {}
        newSetting[category] = isInputChecked;

        const body = Object.assign({},this.state.toggle);

        const newActive = Object.assign({}, this.state.toggle, newSetting);
        
        setConfig(body).then(this.updateConfig.bind(this,newActive));
    }

    toggleAllCategories = (event, isInputChecked) => {
        this.toggled = isInputChecked;
        const body = {
            TOGGLE_ALL: isInputChecked
        };
        Object.keys(this.state.drugList).forEach(val => body[val] = isInputChecked);

        setConfig(body).then(this.updateConfig.bind(this, body))
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