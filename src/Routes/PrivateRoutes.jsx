import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import getSessionToken from 'lib/getSessionToken';

const PrivateRoute = (props) => {
    const { component: Component, ...rest } = props;

    const render = props => {
        if (!getSessionToken()) {
            return <Redirect to={'/'} />;
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={render} />;
}

export default PrivateRoute;