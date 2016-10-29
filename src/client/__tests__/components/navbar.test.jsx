import React from 'react'
import { shallow } from 'enzyme'
import Navbar from '../../app/components/Navbar'
import { loginUser, logoutUser } from '../../app/actions'

function setup(isAuthenticated = false, errorMessage = '') {
    const props = {
        dispatch: jest.fn(),
        isAuthenticated: isAuthenticated,
        errorMessage: errorMessage
    };

    const enzymeWrapper = shallow(<Navbar {...props} />);
    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('Navbar', () => {
        it('should render login if not authenticated', () => {
            const { enzymeWrapper } = setup(false);
            expect(enzymeWrapper.find('Login').length).toBe(1);
        });
        it('should render logout if authenticated', () => {
            const { enzymeWrapper} = setup(true);
            expect(enzymeWrapper.find('Logout').length).toBe(1);
        });
        it('should supply error message to login', () => {
            const { enzymeWrapper} = setup(false, 'the error itself');
            var loginErrorMessageProp = enzymeWrapper.find('Login').get(0).props.errorMessage;
            expect(loginErrorMessageProp).toEqual('the error itself');
        });
        it('should dispatch loginUser with credentials onLoginClick', () => {
            const { enzymeWrapper, props } = setup(false, '');
            let credentials = {username: 'user', password: 'password'};
            enzymeWrapper.find('Login').get(0).props.onLoginClick(credentials);
            expect(props.dispatch.mock.calls.length).toBe(1);
            let loginUserAction = loginUser(credentials);
            expect(props.dispatch.mock.calls[0][0]).toEqual(loginUserAction);
        });

        it('should dispatch logoutUser onLooutClick', () => {
            const { enzymeWrapper, props } = setup(true);
            enzymeWrapper.find('Logout').get(0).props.onLogoutClick();
            expect(props.dispatch.mock.calls.length).toBe(1);
        });
    });
});
