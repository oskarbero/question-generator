import React, { Component } from 'react';
import {
  AppBar,
  MuiThemeProvider,
  Divider,
} from 'material-ui'

import Paper from 'material-ui/Paper';
import MainMenu from './MainMenu';

import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import QuestionDisplay from './QuestionDisplay';
import SettingsMenu from './SettingsMenu';

const styles = {
  MainContent: {
    width: '75%',
    float: 'left',
    height: '100%'
  },
  MainMenu: {
    width: '15%',
    float: 'left',
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
    this.getRequestedContent = this.getRequestedContent.bind(this);
  };

  handleMenuItemClick = (event, menuItem, index) => {
    this.setState(Object.assign({}, this.state, { itemClicked: menuItem.props.children }));
  }

  buildSettingsMenu = () => (
    <div>
      <h1>Settings
        <Divider style={{ marginTop: '1%' }} />
      </h1>
      <SettingsMenu  />
    </div>
  )

  getRequestedContent = () => {
    switch (this.state.itemClicked) {
      case 'Drug Category Questions':
        return <QuestionDisplay />;
      case 'Category Settings':
        return this.buildSettingsMenu();
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <div className="MainAppBar">
            <AppBar
              title="Taia's House Of Drugs"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
          </div>

          <div className="MainMenu" style={styles.MainMenu}>
            <MainMenu itemClickHandler={this.handleMenuItemClick} />
          </div>

          {/* TODO: Element Not relative to the rest - does not adjust size properly */}
          <div className="MainContent" style={styles.MainContent}>
            {this.getRequestedContent()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default App;
