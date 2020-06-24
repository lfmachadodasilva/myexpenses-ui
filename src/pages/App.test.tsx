import React from 'react';
import { render, RenderResult, act, fireEvent, wait } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';

import { App } from './App';
import { setConfiguration } from '../configurations/configurationManager';
import { useAuth } from '../services/authService';
import { Routes } from './routes';
import { createMemoryHistory } from 'history';

jest.mock('../services/authService');
const mockUseAuth = useAuth as jest.Mock;

describe('<App />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('render home page', async () => {
        mockUseAuth.mockImplementation(() => {
            return { user: null, initialising: false };
        });

        let component!: RenderResult;

        await act(async () => {
            component = render(<App />);
        });

        const linkElement = component.getByText(/home/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('render home page authenticated', async () => {
        mockUseAuth.mockImplementation(() => {
            return {
                user: {
                    displayName: 'testDisplayName',
                    email: 'test@test.com',
                    emailVerified: true,
                    getIdTokenResult: jest.fn(() => Promise.resolve({ token: 'token' }))
                } as any,
                initialising: false
            };
        });

        let component!: RenderResult;

        await act(async () => {
            component = render(<App />);
        });

        const linkElement = component.getByText(/home/i);
        expect(linkElement).toBeInTheDocument();
    });
});
