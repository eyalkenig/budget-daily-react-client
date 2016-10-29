import React from 'react'
import { shallow } from 'enzyme'
import Summary from '../../app/components/Summary'
import { fetchSummaryAsync } from '../../app/actions'

function setup(summaryRetrieved = false, today = 0) {
    const props = {
        dispatch: jest.fn(),
        summaryRetrieved: summaryRetrieved,
        today: today
    };

    const enzymeWrapper = shallow(<Summary {...props} />);
    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('Summary', () => {
        it('should render loading if summary not retrieved', () => {
            const { enzymeWrapper } = setup(false);
            expect(enzymeWrapper.find('.label-warning').length).toBe(1);
            expect(enzymeWrapper.find('.label-warning').text()).toBe('Loading...');
        });
        it('should render today summary if summary is retrieved', () => {
            const { enzymeWrapper } = setup(true, 542);
            expect(enzymeWrapper.find('.label-success').length).toBe(1);
            expect(enzymeWrapper.find('.label-success').text()).toBe('542');
        });
        it('should fetch summary on constructing', () => {
            const { props } = setup(false);
            expect(props.dispatch.mock.calls.length).toBe(1);
            expect(props.dispatch.mock.calls[0][0]).toEqual(fetchSummaryAsync());
        });
    });
});
