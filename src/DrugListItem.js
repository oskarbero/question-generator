import React, { Component } from 'react';
import {
    List,
    ListItem,
    Divider,
    AppBar,
    MuiThemeProvider
} from 'material-ui';
import { workbook } from './drugChart';



class DrugListItem extends ListItem {
    constructor(props, context) {
        super(props, context);

        this.state = {
            category: props.category
        }
    }

    printDrugProps = (drug) => (
        Object.keys(drug).map((propName, idx) => {
            if (propName !== "CATEGORY" && propName !== "DRUG NAME") {
                return (
                    <span>
                        <ListItem
                            nestedLevel={2}
                            primaryText={propName}
                            secondaryText={drug[propName]}
                            key={`${propName}${idx}`}
                        />
                        <Divider />
                    </span>
                )
            }
        })
    )

    buildDrugHeaders = () => (
        this.state.category.map((drug, idx) => (
            <span key={`${drug["DRUG NAME"]}`}>
                <ListItem
                    nestedLevel={1}
                    key={`${drug["DRUG NAME"]}_${idx}`}
                    primaryText={drug["DRUG NAME"]}
                    nestedItems={this.printDrugProps(drug)}
                >
                </ListItem>
                <Divider />
            </span>
        ))
    )

    buildCategoryHeader = (category) => (
        <span key={category[0].CATEGORY}>
            <ListItem
                primaryText={category[0].CATEGORY}
                key={this.state.category[0].CATEGORY}
                nestedItems={this.buildDrugHeaders()}
            />
            <Divider />
        </span>
    )


    render() {
        return this.buildCategoryHeader(this.state.category);
    }
}

export default DrugListItem;