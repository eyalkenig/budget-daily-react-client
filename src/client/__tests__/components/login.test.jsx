import React from 'react'
import { shallow, mount } from 'enzyme'
import Login from '../../app/components/Login'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function setup(errorMessge = '') {
    const props = {
        onLoginClick: jest.fn(),
        errorMessage: errorMessge
    };

    const enzymeWrapper = shallow(<Login {...props} />);
    const fullEnzymeWrapper = mount(<Login {...props} />);
    return {
        props,
        enzymeWrapper,
        fullEnzymeWrapper
    }
}

describe('components', () => {
   describe('Login', () => {
       it('should render user name, password and login button', () => {
           const { enzymeWrapper } = setup();
           expect(enzymeWrapper.find('TextField').length).toBe(2);
           expect(enzymeWrapper.find('FlatButton').length).toBe(1);
       });
       it('should call the login callback with the credentials', () => {
           const { fullEnzymeWrapper, props } = setup();
           fullEnzymeWrapper.ref('username').get(0).input.value = 'user';
           fullEnzymeWrapper.ref('password').get(0).input.value = 'pass';
           fullEnzymeWrapper.find('FlatButton').simulate('click');
           var credentials_arg = props.onLoginClick.mock.calls[0][0];
           expect(credentials_arg).toEqual({ username: 'user', password: 'pass' });
       });
   });
});
