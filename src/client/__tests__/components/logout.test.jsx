import React from 'react'
import { shallow, mount } from 'enzyme'
import Logout from '../../app/components/Logout'
import { render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function setup(username) {
    const props = {
        onLogoutClick: jest.fn(),
        username: username
    };

    const enzymeWrapper = shallow(<Logout {...props} />);
    const fullEnzymeWrapper = mount(<Logout {...props} />);
    return {
        props,
        enzymeWrapper,
        fullEnzymeWrapper
    }
}

describe('components', () => {
    describe('Logout', () => {
        it('should render logout button', () => {
            const { fullEnzymeWrapper } = setup();
            expect(fullEnzymeWrapper.find('FlatButton').length).toBe(1);
            expect(fullEnzymeWrapper.find('FlatButton').text()).toBe('Logout');
        });
        it('should render avatar with first char upper case', () => {
            const { fullEnzymeWrapper } = setup('eyal kenig');
            expect(fullEnzymeWrapper.find('Avatar').length).toBe(1);
            expect(fullEnzymeWrapper.find('Avatar').text()).toBe('E');
        });
        it('should call onLogoutClick', () => {
            const { enzymeWrapper, props } = setup();
            enzymeWrapper.find('FlatButton').simulate('click');

            expect(props.onLogoutClick.mock.calls.length).toBe(1);
        });
    });
});
