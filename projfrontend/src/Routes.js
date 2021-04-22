import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/sign-in" exact component={Signin} />
                <Route path="/sign-up" exact component={Signup} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;