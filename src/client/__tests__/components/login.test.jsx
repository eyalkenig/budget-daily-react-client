import React from 'react'
import { shallow, mount} from 'enzyme'
import Login from '../../app/components/Login'

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
           expect(enzymeWrapper.find('.form-control').length).toBe(2);
           expect(enzymeWrapper.find('button').length).toBe(1);
       });
       it('should not render error message if error message is missing', () => {
           const { enzymeWrapper } = setup();
           expect(enzymeWrapper.find('p').length).toBe(0);
       });
       it('should render error message if it exists', () => {
           const { enzymeWrapper } = setup('an error message');
           expect(enzymeWrapper.find('p').length).toBe(1);
           expect(enzymeWrapper.find('p').text()).toBe('an error message');
           expect(enzymeWrapper.find('p').hasClass('login-error-message')).toBeTruthy();
       });
       it('should call the login callback with the credentials', () => {
           const { fullEnzymeWrapper, props } = setup();
           fullEnzymeWrapper.ref('username').get(0).value = 'user';
           fullEnzymeWrapper.ref('password').get(0).value = 'pass';
           fullEnzymeWrapper.find('button').simulate('click');
           var credentials_arg = props.onLoginClick.mock.calls[0][0];
           expect(credentials_arg).toEqual({ username: 'user', password: 'pass' });
       });
   });
});
