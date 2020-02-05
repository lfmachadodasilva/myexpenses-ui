import { Redirect } from 'react-router';
import React from 'react';
import { signOut } from '../../auth';

/**
 * Logout page
 */
const LogoutPage: React.FC = () => {
    const { from } = { from: { pathname: '/' } };

    signOut();

    return (
        <>
            <Redirect from='' to={from.pathname} />
        </>
    );
};

export default LogoutPage;