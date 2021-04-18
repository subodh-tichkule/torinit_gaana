import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import getSessionToken from 'lib/getSessionToken';

// interface PublicRouteProps {
//     restricted?: boolean;
// }

const PublicRoute = (props) => {
    const { component: Component,restricted = false, ...rest } = props;

    const render = props => {
        if (getSessionToken() && restricted) {
            return <Redirect to={'/home'} />;
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={render} />;
}

export default PublicRoute;