import reducer from '../app/reducers'
import * as actions from '../app/actions'

describe('auth', () => {

    it('should have default logged off when local storage has no auth token', () => {
        const { auth } = reducer(undefined, {});
        expect(auth).toEqual(
            {
                isFetching: false,
                isAuthenticated: false
            }
        );
    });
    it('should have default logged on when local storage has auth token', () => {
        localStorage.setItem('auth_token', 'an-auth-token');
        const { auth } = reducer(undefined, {});
        expect(auth).toEqual(
            {
                isFetching: false,
                isAuthenticated: true
            }
        );
    });
    it('should be not authenticated and is fetching when login requested', () => {
        const { auth } = reducer(undefined, { type: actions.LOGIN_REQUEST });
        expect(auth).toEqual(
            {
                isFetching: true,
                isAuthenticated: false
            }
        );
    });

    it('should set error on login failure', () => {
        const errorMessage = 'error message'
        const action = {
            type: actions.LOGIN_FAILURE,
            message: errorMessage
        };
        const { auth } = reducer(undefined, action);
        expect(auth).toEqual(
            {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: errorMessage
            }
        );
    });
    it('should not be isAuthenticated after logout success', () => {
        const { auth } = reducer(undefined, { type: actions.LOGOUT_SUCCESS });
        expect(auth).toEqual(
            {
                isFetching: false,
                isAuthenticated: false
            }
        );
    });
    it('should return same state if action type is missing', () => {
        var state = { auth: { isFetching: false } };
        const { auth } = reducer(state, { type: 'action that is not there' });
        expect(auth).toEqual(state.auth);
    });
});

describe('summary', () => {

    it('should have default state as not retrieved', () => {
        const { summary } = reducer(undefined, {});
        expect(summary).toEqual(
            {
                summaryRetrieved: false,
                summaryContent: 0
            }
        );
    });

    it('should set summary retrieved as false on summary requested', () => {
        const { summary } = reducer(undefined, { type: actions.DAILY_SUMMARY_REQUEST });
        expect(summary).toEqual({
            summaryContent: 0,
            summaryRetrieved: false
        });
    });

    it('should set summary retrieved as false on summary failure', () => {
        const { summary } = reducer(undefined, { type: actions.DAILY_SUMMARY_FAILURE });
        expect(summary).toEqual({
            summaryContent: 0,
            summaryRetrieved: false
        });
    });

    it('should save daily bduget as the summary content', () => {
        var action = {
            type: actions.DAILY_SUMMARY_SUCCESS,
            response: {
                daily_budget: 123
            }
        };
        const { summary } = reducer(undefined, action);
        expect(summary).toEqual(
            {
                summaryRetrieved: true,
                summaryContent: 123
            }
        );
    });
});