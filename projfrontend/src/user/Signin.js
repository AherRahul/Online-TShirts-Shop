import React, { useState } from 'react';
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom";

import {signin, authenticate, isAuthenticated} from "../auth/helper/index";

const Signin = () => {

    const [values, setValues] = useState({
        email: "rahulvijayaher@bts.com",
        password: "R@hu95heR",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
        .then( data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                });
            }
        })
        .catch( console.log("Sign-In request failed..!!") );
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="col-md-6 offset-sm-3 text-left border-1">
                    <div className="alert alert-info">
                        <h2>Loading...</h2>
                    </div>
                </div>
            )
        );
    }

    const errorMessage = () => {
        return (
            <div className="row" style={{display: error ? "" : "none"}}>
                <div className="col-md-6 offset-sm-3 text-left border-1">
                    <div className="alert alert-danger" >
                        {error}
                    </div>
                </div>
            </div>
        );
    };


    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left border-1 card p-5 card-header">
                    <form>
                        
                        <div className="form-group">
                            <label >
                                Email: 
                            </label>

                            <input type="email" className="form-control" onChange={handleChange("email")} value={email} required />
                        </div>

                        <div className="form-group">
                            <label >
                                Password: 
                            </label>

                            <input type="password" className="form-control" onChange={handleChange("password")} value={password} required />
                        </div>

                        <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )    
    };

    return ( 
        <Base title="Sign-In Work's" descriptions="Sign-In Page Description">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}

            <p className="text-center">{JSON.stringify(values)}</p>
        </Base>
     );
}
 
export default Signin;