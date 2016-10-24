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
        id_token: user.id_token
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
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: 'username='+credentials.username+'&password='+credentials.password
    }

    return dispatch => {
        dispatch(requestLogin(credentials));

        return fetch('http://localhost:3450/authenticate', config)
            .then(response => response.json().then(user => ({ user, response })))
            .then(({ user, response }) => {
                if (!response.ok) {
                    dispatch(loginError(user.error.user_authentication.join(',')));
                    return Promise.reject(user);
                } else {
                    localStorage.setItem('id_token', user.id_token);
                    dispatch(receiveLogin(user));
                }
            }).catch(err => {
                console.log("Error:" , err.error['user_authentication']);
               });
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
        localStorage.removeItem('id_token');
        dispatch(receiveLogout());
    }
}
