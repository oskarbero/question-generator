import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createLogger } from 'redux-logger';
import App from './components/App';
import rootReducer from './reducers';
import {fetchConfig, fetchDrugList} from './actions/asyncActions';
// import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
    )
)

const rootElement = document.getElementById('root')

const render = () => ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)

store.subscribe(render);

// Initialize the data from S3
store.dispatch(fetchConfig()).then(()=> console.log(store.getState));
store.dispatch(fetchDrugList()).then(()=> console.log(store.getState));

render()

