import { connect } from 'react-redux';
import { toggleAllCategories, updateActiveCategory, updateAllCategories } from '../actions/asyncActions';
import SettingsMenu from '../components/SettingsMenu';
const initialState = {

}

const mapStateToProps = (state={toggle: {}, drugList: {}}, ownProps) => {
    return {
        toggle: state.toggle,
        drugList: state.drugList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCategoryClick: (active, id, event, status) => {
            dispatch(updateActiveCategory(active, id, status))
        },
        onAllCategoriesClick: (drugList, event, status) => {
            dispatch(updateAllCategories(drugList, status));
        }
    }
}


const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsMenu);

export default SettingsContainer;