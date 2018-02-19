import React, { Component } from 'react';
import {
  AppBar,
  MuiThemeProvider,
} from 'material-ui'
import Settings from '../containers/SettingsContainer';
import QuestionContainer from '../containers/QuestionContainer';
import MainMenu from './MainMenu';
import '../stylesheets/App.css';

class App extends Component {
  getRequestedContent = () => {
    switch (this.props.menuItemClicked) {
      case 'ADRs':
      case 'Uses':
      case 'Drug Category':
        return <QuestionContainer />;
      case 'Settings':
        return <Settings />
      case 'Question Generator':
      default:
        return <h1>Hello, welcome to my question generator fren!</h1>;
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="wrapper">
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <div className="main-head">
            <AppBar
              title="Taia's House Of Drugs"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
          </div>
          <div className="main-menu">
            <MainMenu onItemClick={this.props.onItemClick} />
          </div>
          <div className="main-content">
            {this.getRequestedContent()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
