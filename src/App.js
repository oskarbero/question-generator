import React, { Component } from 'react';
import {
  AppBar,
  MuiThemeProvider,
} from 'material-ui'
import { workbook } from './drugChart';

import Paper from 'material-ui/Paper';
import DrugList from './DrugList';
import MainMenu from './MainMenu';

import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import QuestionDisplay from './QuestionDisplay';

const styles = {
  MainContent: { 
    width: '75%', 
    float: 'left', 
    height: '100%'
  },
  MainMenu: { 
    width: '15%', 
    float: 'left', 
    overflow: 'auto' 
  },
  MainAppBar: {
    'heigth': '10%'
  }
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      itemClicked: 'Drug Category Questions'
     };
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  };

  handleMenuItemClick = (event, menuItem, index) => {
    this.setState(Object.assign({}, this.state, {itemClicked: menuItem.props.children}));
  }

  getRequestedContent = () => {
    switch(this.state.itemClicked) {
      case 'Drug Category Questions':
        return (<QuestionDisplay drugList={workbook} numDrugCategories={Object.keys(workbook).length}/>);
      case 'Settings':
        return (<div><h1> Settings </h1></div>);
    }
  }

  MainMenuOverlay = (props) => {
    return (
      <div>
        <div className="MainAppBar">
          <AppBar
            title="Taia's House Of Drugs"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </div>

        <div className="MainMenu" style={styles.MainMenu}>
          <MainMenu itemClickHandler={this.handleMenuItemClick}/>
        </div>

        {/* TODO: Element Not relative to the rest - does not adjust size properly */}
        <div className="MainContent" style={styles.MainContent}>
            {this.getRequestedContent()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        {this.MainMenuOverlay()}
      </MuiThemeProvider>
    );
  }
}


export default App;
