import React, { Component } from 'react';
import DrugListItem from './DrugListItem';
import {
    List,
    ListItem,
    Divider,
    AppBar,
    MuiThemeProvider
} from 'material-ui';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  List: {
    width: '100%',
    height: 'auto'
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const printDrugProps = (drug) => (
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

const printDrugList = (category) => {
  return (
    <span key={category[0].CATEGORY}>
      <ListItem
        primaryText={category[0].CATEGORY}
        key={category[0].CATEGORY}
        nestedItems={
          category.map((drug, idx) => (
            <span key={`${drug["DRUG NAME"]}_${idx}_1`}>
              <ListItem
                nestedLevel={1}
                key={`${drug["DRUG NAME"]}_${idx}`}
                primaryText={drug["DRUG NAME"]}
                nestedItems={printDrugProps(drug)}
              >
              </ListItem>
              <Divider />
            </span>
          ))
        }>
      </ListItem>
      <Divider />
    </span>
  )
};

class DrugList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        workbook: props.drugList       
    };
  };

  render() {
    return (
      <MuiThemeProvider>
          <List style={styles.List}>
            {
              Object.values(this.state.workbook).map((drugCategory, idx) => (
                <DrugListItem category={drugCategory} />
              ))
            }
          </List>
      </MuiThemeProvider>
    );
  }
}

export default DrugList;
