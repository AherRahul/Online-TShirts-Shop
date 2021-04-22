import React, { useState } from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";

const Signin = () => {

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left border-1 card p-5 card-header">
                    <form>
                        
                        <div className="form-group">
                            <label >
                                Email: 
                            </label>

                            <input type="email" className="form-control" required />
                        </div>

                        <div className="form-group">
                            <label >
                                Password: 
                            </label>

                            <input type="password" className="form-control" required />
                        </div>

                        <button className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )    
    };

    return ( 
        <Base title="Sign-In Work's" descriptions="Sign-In Page Description">
            {signInForm()}
        </Base>
     );
}
 
export default Signin;