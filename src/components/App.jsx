import React, { Component } from 'react';
import {
  AppBar,
  MuiThemeProvider,
} from 'material-ui'

import MainMenu from './MainMenu';

import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import QuestionDisplay from './QuestionDisplay';
import SettingsMenu from './SettingsMenu';
import styles from './MainStyles';

/*
const styles = {
  MainContent: {
    width: '75%',
    height: '100%'
  },
  MainMenu: {
    width: '15%',
    float: 'left'
  },
  MainAppBar: {
    width: '76.5%'
  }
};
*/

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
    <div className="SettingsMenu" style={styles.SettingsMenu}>
      {/* <h1>Settings
        <Divider style={{ marginTop: '1%' }} />
      </h1> */}
      <SettingsMenu  />
    </div>
  )

  getRequestedContent = () => {
    switch (this.state.itemClicked) {
      case 'Drug Category Questions':
        return <QuestionDisplay />;
      case 'Category Settings':
        return this.buildSettingsMenu();
      default:
        return undefined;
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <div className="MainAppBar" style={styles.MainAppBar}>
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
