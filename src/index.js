import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import mainMenuReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(mainMenuReducer);
const rootElement = document.getElementById('root');


const render = () => ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)

registerServiceWorker();

render()
store.subscribe(render);

