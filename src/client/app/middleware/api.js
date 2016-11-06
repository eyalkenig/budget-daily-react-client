const BASE_URL = 'http://localhost:3450/';

function callApi(method, endpoint, body, authenticated, version) {
    let apiVersion = version || 'v1';
    let token = localStorage.getItem('auth_token') || null;
    let config = {
        method: method
    }

    if (method == 'POST') {
        config['body'] = body;
    }

    if (authenticated) {
        if (token) {
            config['headers'] = { 'Authorization': `Bearer ${token}` }
        }
        else {
            throw 'No token save!'
        }
    }
    else {
        config['headers'] = { 'Content-Type':'application/x-www-form-urlencoded' }
    }

    let apiEndpoint = BASE_URL + apiVersion + '/' + endpoint;
    return fetch(apiEndpoint, config)
            .then(response =>
                    response.json()
                             .then(result => ({ result, response}))
                 ).then(({ result, response }) => {
                            if (!response.ok) {
                                return Promise.reject(result);
                            }
                            return result;
                        });
}

function getApiErrorMessage(error) {
    if (error.message) {
        return error.message;
    }

    if (error.error) {
        let allErrors = [];
        for (var property in error.error) {
            if (error.error.hasOwnProperty(property)) {
                let errorMessage = '';
                if (Array.isArray(error.error[property])) {
                    errorMessage = error.error[property].join(',');
                }
                else{
                    errorMessage = error.error[property];
                }
                allErrors.push(errorMessage);
            }
        }
        if (allErrors.length > 0) {
            return allErrors.join(',');
        }
    }

    return 'There was an error.';
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
    const callAPI = action[CALL_API];

    // So the middeware doesnt get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { method, endpoint, body, types, authenticated, version } = callAPI;

    const [ requestType, successType, errorType ] = types;

    store.dispatch(requestType);

    return callApi(method, endpoint, body, authenticated, version).then(
        response =>
            next({
                response,
                authenticated,
                type: successType
            }),
        error => {
            console.log(error);
            next({
                message: getApiErrorMessage(error),
                type: errorType
            });
        }
    );
}
