import { connect } from 'react-redux';
import App from '../components/App'
import { invalidateConfig } from "../actions/asyncActions";
import { 
    resetQuestionDisplay,
    mainMenuClick,
} from '../actions'


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => ({
    onItemClick: (id) => {
        dispatch(invalidateConfig());
        dispatch(mainMenuClick(id))
        dispatch(resetQuestionDisplay())
    }
})

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer;
