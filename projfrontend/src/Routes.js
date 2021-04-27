import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import AdminRoutes from "./auth/helper/AdminRoutes";
import UserDashboard from './user/UserDashBoard';
import AdminDashboard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/sign-in" exact component={Signin} />
                <Route path="/sign-up" exact component={Signup} />

                <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />

                <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoutes path="/admin/create/category" exact component={AddCategory} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;