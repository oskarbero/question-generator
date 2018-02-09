
import { connect } from 'react-redux';
import { toggleCategory, toggleAllCategories } from '../actions';
import QuestionDisplay from '../components/QuestionDisplay';


const mapStateToProps = (state, ownProps) => {
    return {
        toggle: state.toggle,
        drugList: state.drugList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // ID is category name
        onCategoryClick: (id, event, status) => {
            dispatch(toggleCategory(id, status))
        },
        onAllCategoriesClick: (event, status) => {
            dispatch(toggleAllCategories(status));
        }
    }
}


const ActiveSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestSettings);

export default ActiveSettings;