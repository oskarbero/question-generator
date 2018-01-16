import React, { Component } from 'react';
import {
    Menu,
    MenuItem,
    Paper
} from 'material-ui';

const style = {
    display: 'inline-block',
};

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    render() {
        return (
            <Paper style={{ display: 'inline-block' }}>
                <Menu onItemClick={this.props.itemClickHandler} >
                    <MenuItem>
                        Drug Category Questions
                    </MenuItem>
                    <MenuItem>
                        Settings
                    </MenuItem>
                   
                </Menu>
            </Paper>
        );
    }
}

export default MainMenu;