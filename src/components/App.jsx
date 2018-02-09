import React, { Component } from 'react';
import {
  AppBar,
  MuiThemeProvider,
} from 'material-ui'
import ActiveSettings from '../containers/ActiveSettings';
import MainMenu from './MainMenu';

import QuestionDisplay from './QuestionDisplay';
import SettingsMenu from './SettingsMenu';
import '../stylesheets/App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      itemClicked: 'Question Generator',
      lastClicked: ''
    };
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.getRequestedContent = this.getRequestedContent.bind(this);
  };

  handleMenuItemClick = (itemClicked) => {
    // To intoxicated to read this but it works .. it's stupid but it works.
    let lastClicked = this.state.itemClicked !== itemClicked ? itemClicked : this.state.itemClicked;
    this.setState(Object.assign({}, this.state, { itemClicked }, {lastClicked}));
  }

  getRequestedContent = () => {
    switch (this.state.itemClicked) {
      case 'ADRs':
      case 'Drug Category':
        return <QuestionDisplay questionType={this.state.itemClicked} lastClicked={this.state.lastClicked}/>;
      case 'Settings':
        return <ActiveSettings />
      case 'Question Generator':
      default:
        // Dummy content
        return <h1>Hello, welcome to my question generator fren!</h1>;
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <div className="row">
            <div className="MainAppBar col-12">
              <AppBar
                title="Taia's House Of Drugs"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <MainMenu itemClickHandler={this.handleMenuItemClick} />
            </div>
            <div className="col-10">
              {this.getRequestedContent()}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default App;
