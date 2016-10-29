import { combineReducers } from 'redux'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
    DAILY_SUMMARY_REQUEST, DAILY_SUMMARY_SUCCESS, DAILY_SUMMARY_FAILURE
} from './actions'

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
                isFetching: false,
                isAuthenticated: false
        });
        default:
            return state;
    }
}

function summary(state = {
        summaryRetrieved: false,
        summaryContent: 0
    }, action) {
    switch (action.type) {
        case DAILY_SUMMARY_REQUEST:
            return Object.assign({}, state, {
                summaryRetrieved: false
            });
        case DAILY_SUMMARY_SUCCESS:
            return Object.assign({}, state, {
                summaryRetrieved: true,
                summaryContent: action.response.daily_budget
            });
        case DAILY_SUMMARY_FAILURE:
            return Object.assign({}, state, {
                summaryRetrieved: false
            });
        default:
            return state;
    }
}

// We combine the reducers here so that they
// can be left split apart above
const budgetApp = combineReducers({
    auth,
    summary
});

export default budgetApp
