import { connect } from 'react-redux';
import { updateActiveCategory, updateAllCategories } from '../actions/asyncActions';
import SettingsMenu from '../components/SettingsMenu';

const mapStateToProps = (state, ownProps) => {
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCategoryClick: (active, id, event, status) => {
        dispatch(updateActiveCategory(active, id, status))
    },
    onAllCategoriesClick: (drugList, event, status) => {
        dispatch(updateAllCategories(drugList, status));
    }
})

const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsMenu);

export default SettingsContainer;