import React from 'react';
import {
    Paper,
    List,
    ListItem,
    Divider
} from 'material-ui';
import QuestionAnswerIcon from 'material-ui/svg-icons/action/question-answer';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

const MainMenu = ({ onItemClick }) => {
    const handler = (name) => (onItemClick.bind(undefined, name));

    const QuestionSubMenu = () => ([
        <ListItem
            key={1}
            primaryText="Drug Category"
            onClick={handler("Drug Category")}
        />,
        <ListItem
            key={2}
            primaryText="ADRs"
            onClick={handler("ADRs")}
        />
    ]);
    
    return (
        <Paper>
            <List>
                <ListItem 
                    primaryText="Question Generator"
                    onClick={handler('Question Generator')}
                    initiallyOpen={true}
                    primaryTogglesNestedList={true}
                    leftIcon={<QuestionAnswerIcon/>}
                    nestedItems={QuestionSubMenu()}
                >
                </ListItem>
                <Divider/>
                <ListItem
                    primaryText="Settings"
                    leftIcon={<SettingsIcon/>}
                    onClick={handler("Settings")}
                />
            </List>
         
        </Paper>
    );
}

export default MainMenu;