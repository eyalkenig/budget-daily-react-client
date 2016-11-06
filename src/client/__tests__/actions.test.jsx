import * as actions from '../app/actions'
import { CALL_API } from '../app/middleware/api';

describe('login', () => {

    it('should use API middleware symbol for login', () => {
        const credentials = {
            username: 'user_name',
            password: 'the_password'
        };
        let action = actions.loginUser(credentials);

        expect(action[CALL_API]).toBeDefined()
    });
    it('should not be marked as an authenticated request', () => {
        const credentials = {
            username: 'user_name',
            password: 'the_password'
        };
        let action = actions.loginUser(credentials);

        expect(action[CALL_API].authenticated).toBeFalsy();
    });
    it('should be a POST request with credentials in the body', () => {
        const credentials = {
            username: 'user_name',
            password: 'the_password'
        };
        let action = actions.loginUser(credentials);

        expect(action[CALL_API].endpoint).toEqual('authenticate');
        expect(action[CALL_API].method).toEqual('POST');
        expect(action[CALL_API].body).toEqual('username=user_name&password=the_password');
    });
    it('should send request/success/failure types', () => {
        const credentials = {
            username: 'user_name',
            password: 'the_password'
        };
        let action = actions.loginUser(credentials);

        let expectedRequest = {
            type: actions.LOGIN_REQUEST,
            isFetching: true,
            isAuthenticated: false,
            credentials
        }
        expect(action[CALL_API].types[0]).toEqual(expectedRequest);
        expect(action[CALL_API].types[1]).toBe(actions.LOGIN_SUCCESS);
        expect(action[CALL_API].types[2]).toBe(actions.LOGIN_FAILURE);
    });
});

describe('logout', () => {
    it('should remove auth token from local storage', () => {
        localStorage.setItem('auth_token', 'an-auth-token');
        let callback = actions.logoutUser();
        callback(function() {});
        expect(localStorage.getItem('auth_token')).toBeUndefined();
    });
    it('should dispatch receive logout action', () => {
        let callback = actions.logoutUser();
        let logoutWasCalled = false;
        callback(function(action) {
            if (action.type == actions.LOGOUT_SUCCESS) {
                logoutWasCalled = true;
            }
        });
        expect(logoutWasCalled).toBeTruthy();
    });
});