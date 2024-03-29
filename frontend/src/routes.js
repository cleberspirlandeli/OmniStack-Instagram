import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Login from './pages/Login';
import Feed from './pages/Feed';
import New from './pages/New';
import ConfirmLogin from './pages/ConfirmLogin';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (

        isAuthenticated()
            ? (<Component {...props} />)
            : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    )} />
)

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/confirm-register/:id" component={ConfirmLogin} />
                <PrivateRoute path="/feed" component={Feed} />
                <PrivateRoute path="/new" component={New} />
            </Switch>
        </BrowserRouter >
    );
}

export default Routes