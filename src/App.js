import React, { Component } from 'react';
// import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
// import AppBar from 'material-ui/AppBar';

import {
  Paper,
  Tabs,
  Tab,
  AppBar,
  ActionInfo
} from 'material-ui'
import Checkbox from 'material-ui/Checkbox';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
// import Visibility from 'material-ui/svg-icons/action/visibility';
// import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import Divider from 'material-ui/Divider';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui';
// import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import { workbook } from './drugChart';

// Ref
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '80%',
    overflowY: 'auto',
    overflowX: 'auto'
  },
  List: {
    width: '50%',
    height: 'auto'
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const printGrid = (workbook) => {
  return Object.keys(workbook);
}

const getIconButton = (color) => (
  <IconButton>
    <StarBorder color={color} />
  </IconButton>
);

const printDrugList = (category) => {
  return (
    <span>
    <ListItem
      primaryText={category[0].CATEGORY}
      key={category[0].CATEGORY}
      nestedItems={
        category.map(drug => (
          <span>
          <ListItem
            nestedLevel={1}
            key={drug["DRUG NAME"]}
            primaryText={drug["DRUG NAME"]}
            nestedItems={[
              //<Tabs>}
              //   {
              //     Object.keys(drug).map((propName, idx) => {

              //     if(propName != "CATEGORY") {
              //       return ( `
              //       <Tab label={propName}>
              //         <div>
              //           <h2 style={styles.headline}>{drug[propName]}</h2>
              //         </div>
              //       </Tab>
              //     )
              //   }
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
            ]}
          >
          </ListItem>
          <Divider />
          </span>
        ))
      }
    />
    <Divider/>
    </span>
  )
};

const thing1 = (
  <ListItem primaryText="ITEM 1" />
)
const divider = (
  <Divider />
)

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      workbook
    };
  };

  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title="Drug List"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Paper zDepth={2}>
          <List style={styles.List}>
            {
              Object.values(workbook).map((drugCategory, idx) => (
                printDrugList(drugCategory)
              ))
            }
          </List>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
