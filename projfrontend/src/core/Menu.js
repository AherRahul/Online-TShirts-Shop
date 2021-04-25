import React, { Fragment } from 'react';
import { Link,  withRouter, Redirect } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';


const currentTab = (history, path) => {
    if ( history.location.pathname === path ) {
        history.location.pathName = path; 
        return 'nav-item active';
    } else {
        history.location.pathName = path; 
        return 'nav-item';
    }
};


const Menu = (
        { 
            history 
        }
    ) => {
    return ( 
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Fusion T-shirt Shop</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={ currentTab(history, "/") }>
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className={currentTab(history, "/cart")}>
                            <Link className="nav-link" to="/cart">
                                Cart
                            </Link>
                        </li>

                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <li className={currentTab(history, "/user/dashboard")}>
                                <Link className="nav-link" to="/user/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li className={currentTab(history, "/admin/dashboard")}>
                                <Link className="nav-link" to="/admin/dashboard">
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}

                        {!isAuthenticated() && (
                            <Fragment>
                                <li className={currentTab(history, "/sign-up")}>
                                    <Link className="nav-link" to="/sign-up">
                                        Sign Up
                                    </Link>
                                </li>
                                <li className={currentTab(history, "/sign-in")}>
                                    <Link className="nav-link" to="/sign-in">
                                        Sign In
                                    </Link>
                                </li>
                            </Fragment>
                        )}

                        {isAuthenticated() && (
                            <li className="nav-item">
                                <span className="nav-link text-warning" onClick={ () => {
                                    signout(() => {
                                        history.push("/");
                                        return <Redirect to="/" />
                                    })
                                }} >
                                    Signout
                                </span>
                            </li>
                        )}
                    </ul> 
                </div>
            </nav>
        </div>
     );
}
 
export default withRouter(Menu);