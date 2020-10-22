import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { userContext } from '../contexts/user';

interface PrivateRouteProps {
    component: any;
    path?: string;
}

export const PrivateRoute = ({ component: Component, path, ...other }: PrivateRouteProps) => {
    const { user } = useContext(userContext);
    return user ? <Component /> : <Redirect to="/auth" />;
};
