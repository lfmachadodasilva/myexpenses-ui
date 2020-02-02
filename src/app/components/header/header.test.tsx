import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import HeaderComponent from './header';
import { Nav } from 'react-bootstrap';

describe('header component', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<HeaderComponent />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('renders component', () => {
        const wrapper = shallow(<HeaderComponent />);
        expect(wrapper.length).toBeGreaterThan(0);
    });

    test('default selection', () => {
        const wrapper = shallow(<HeaderComponent />);

        const nav = wrapper.find(Nav);
        expect(nav.props().activeKey).toBe('/');
    });
});
