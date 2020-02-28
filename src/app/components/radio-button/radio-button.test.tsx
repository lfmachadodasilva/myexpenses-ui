import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RadioButtonComponent from './radio-button';

const initialProps = {
    value: 1,
    buttons: [
        { id: 1, label: 'label 1' },
        { id: 2, label: 'label 2' },
        { id: 3, label: 'label 3' }
    ]
} as React.ComponentProps<typeof RadioButtonComponent>;

describe('radio-buttons', () => {
    test('change value should call onChange', () => {
        const onChangeMockFn = jest.fn();
        const props = {
            ...initialProps,
            onChange: onChangeMockFn
        } as React.ComponentProps<typeof RadioButtonComponent>;
        const { getByText } = render(<RadioButtonComponent {...props} />);

        fireEvent.click(getByText('label 2'));
        expect(onChangeMockFn.mock.calls[0][0]).toBe(2);
        expect(onChangeMockFn.mock.calls.length).toBe(1);

        onChangeMockFn.mockClear();

        fireEvent.click(getByText('label 3'));
        expect(onChangeMockFn.mock.calls[0][0]).toBe(3);
        expect(onChangeMockFn.mock.calls.length).toBe(1);

        onChangeMockFn.mockClear();

        fireEvent.click(getByText('label 1'));
        expect(onChangeMockFn.mock.calls[0][0]).toBe(1);
        expect(onChangeMockFn.mock.calls.length).toBe(1);
    });
});
