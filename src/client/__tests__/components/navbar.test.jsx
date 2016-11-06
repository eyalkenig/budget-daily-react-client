import React from 'react'
import { shallow, mount } from 'enzyme'
import Navbar from '../../app/components/Navbar'
import { loginUser } from '../../app/actions'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function setup(isAuthenticated = false, errorMessage = '') {
    const props = {
        dispatch: jest.fn(),
        isAuthenticated: isAuthenticated,
        errorMessage: errorMessage
    };

    const enzymeWrapper = shallow(<Navbar {...props} />);
    const fullEnzymeWrapper = mount(<Navbar {...props} />);
    return {
        props,
        enzymeWrapper,
        fullEnzymeWrapper
    }
}

describe('components', () => {
    describe('Navbar', () => {
        it('should render login if not authenticated', () => {
            const { fullEnzymeWrapper } = setup(false);
            expect(fullEnzymeWrapper.find('Login').length).toBe(1);
        });
        it('should render logout if authenticated', () => {
            const { fullEnzymeWrapper} = setup(true);
            expect(fullEnzymeWrapper.find('Logout').length).toBe(1);
        });
        it('should supply error message to login', () => {
            const { fullEnzymeWrapper} = setup(false, 'the error itself');
            var loginErrorMessageProp = fullEnzymeWrapper.find('Login').get(0).props.errorMessage;
            expect(loginErrorMessageProp).toEqual('the error itself');
        });
        it('should dispatch loginUser with credentials onLoginClick', () => {
            const { fullEnzymeWrapper, props } = setup(false, '');
            let credentials = {username: 'user', password: 'password'};
            fullEnzymeWrapper.find('Login').get(0).props.onLoginClick(credentials);
            expect(props.dispatch.mock.calls.length).toBe(1);
            let loginUserAction = loginUser(credentials);
            expect(props.dispatch.mock.calls[0][0]).toEqual(loginUserAction);
        });

        it('should dispatch logoutUser onLooutClick', () => {
            const { fullEnzymeWrapper, props } = setup(true);
            fullEnzymeWrapper.find('Logout').get(0).props.onLogoutClick();
            expect(props.dispatch.mock.calls.length).toBe(1);
        });
    });
});
