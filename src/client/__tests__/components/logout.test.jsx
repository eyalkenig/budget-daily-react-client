import React from 'react'
import { shallow } from 'enzyme'
import Logout from '../../app/components/Logout'

function setup() {
    const props = {
        onLogoutClick: jest.fn()
    };

    const enzymeWrapper = shallow(<Logout {...props} />);
    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('Logout', () => {
        it('should render logout button', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find('button').length).toBe(1);
            expect(enzymeWrapper.find('button').text()).toBe('Logout');
        });
        it('should call onLogoutClick', () => {
            const { enzymeWrapper, props } = setup();
            enzymeWrapper.find('button').simulate('click');

            expect(props.onLogoutClick.mock.calls.length).toBe(1);
        });
    });
});
