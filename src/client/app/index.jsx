import React from 'react';
import {render} from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import budgetApp from './reducers';
import thunkMiddleware from 'redux-thunk';
//import api from './middleware/api';

//let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);
let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
let store = createStoreWithMiddleware(budgetApp);
let rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)