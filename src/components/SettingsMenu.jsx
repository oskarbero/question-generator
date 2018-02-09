import React from 'react'
import {
    List,
    ListItem,
    Subheader,
    Divider,
    Toggle
} from 'material-ui';

const TestSettings = ({ drugList, toggle, onCategoryClick, onAllCategoriesClick }) => {

    const CategoryToggle = (category) => (
        <Toggle
            toggled={toggle[category]}
            onToggle={onCategoryClick.bind(this, toggle, category)}
        />
    )

    const CategoryListItem = (category) => (
        <ListItem
            key={category}
            primaryText={category}
            rightToggle={CategoryToggle(category)}
        />
    )

    return (
        <div>
            <h1>TEST Settings
                <Toggle
                    toggled={toggle['TOGGLE_ALL']}
                    onToggle={onAllCategoriesClick}
                />
                <Divider style={{ marginTop: '1%' }} />
            </h1>
            <List>
                <Subheader>Categories included</Subheader>
                {Object.keys(drugList).map(CategoryListItem)}
            </List>
        </div>
    )
}

export default TestSettings;