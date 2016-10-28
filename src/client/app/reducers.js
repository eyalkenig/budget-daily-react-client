import { combineReducers } from 'redux'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from './actions'

function auth(state = {
        isFetching: false,
        isAuthenticated: localStorage.getItem('auth_token') ? true : false // TODO: add expire
    }, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.credentials
            });
        case LOGIN_SUCCESS:
            localStorage.setItem('auth_token', action.response.auth_token);
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
        });
        default:
            return state;
    }
}

// The budget reducer
function budget(state = {}, action) {
    switch (action.type) {

        default:
            return state
    }
}

// We combine the reducers here so that they
// can be left split apart above
const budgetApp = combineReducers({
    auth,
    budget
});

export default budgetApp
