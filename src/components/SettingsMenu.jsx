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

    const AllCategoriesToggle = () => (
        <ListItem
            key={"TOGGLE_ALL"}
            primaryText={"Toggle All"}
            rightToggle={
                <Toggle
                    toggled={toggle ? toggle['TOGGLE_ALL'] : false}
                    onToggle={onAllCategoriesClick.bind(this, drugList)}
                />
            }
        />
    )

    return (
        <div className="sub-wrapper">
            <div className="sub-header">
                <h1>TEST Settings </h1>
                <Divider />
                <Subheader>Categories included</Subheader>
            </div>
            <div className="sub-content">
                <List>
                    {AllCategoriesToggle()}
                    {Object.keys(drugList).map(CategoryListItem)}
                </List>
            </div>
        </div>
    )
}

export default TestSettings;