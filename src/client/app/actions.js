import { CALL_API } from './middleware/api';

export const A_DEFAULT_ACTION_TYPE = 'A_DEFAULT_ACTION_TYPE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(credentials) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        credentials
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        auth_token: user.auth_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function loginUser(credentials) {
    return {
        type: A_DEFAULT_ACTION_TYPE,
        [CALL_API]: {
            method: 'POST',
            endpoint: 'authenticate',
            authenticated: false,
            body: 'username='+credentials.username+'&password='+credentials.password,
            types: [requestLogin(credentials), LOGIN_SUCCESS, LOGIN_FAILURE]
        }
    }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('auth_token');
        dispatch(receiveLogout());
    }
}

export const DAILY_SUMMARY_REQUEST = 'DAILY_SUMMARY_REQUEST';
export const DAILY_SUMMARY_SUCCESS = 'DAILY_SUMMARY_SUCCESS';
export const DAILY_SUMMARY_FAILURE = 'DAILY_SUMMARY_FAILURE';


function requestSummary() {
    return {
        type: DAILY_SUMMARY_REQUEST,
        summaryRetrieved: false
    }
}
function receiveSummary(summaryContent) {
    return {
        type: DAILY_SUMMARY_SUCCESS,
        summaryRetrieved: true,
        summaryContent: summaryContent
    }
}
function summaryError(message) {
    return {
        type: DAILY_SUMMARY_FAILURE,
        summaryRetrieved: false,
        message
    }
}

export function fetchSummaryAsync() {
    return {
        type: A_DEFAULT_ACTION_TYPE,
        [CALL_API]: {
            method: 'GET',
            endpoint: 'summary/daily',
            authenticated: true,
            types: [requestSummary(), DAILY_SUMMARY_SUCCESS, DAILY_SUMMARY_FAILURE]
        }
    }
}
