import React from 'react';
import {
    Menu,
    MenuItem,
    Paper
} from 'material-ui';

const style = {
    display: 'inline-block',
    zDepth: '5px' 
};

const MainMenu = ({itemClickHandler}) => {
    return (
        <Paper style={style}>
            <Menu onItemClick={itemClickHandler} >
                <MenuItem>
                    Drug Category Questions
                </MenuItem>
                <MenuItem>
                    Category Settings
                </MenuItem>
            </Menu>
        </Paper>
    );
}

export default MainMenu;