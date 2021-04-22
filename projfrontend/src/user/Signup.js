import React, { userState, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    // Destructuring values object
    const { name, email, password, success } = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left border-1 card p-5 card-header">
                    <form>  
                        <div className="form-group">
                            <label >
                                Name: 
                            </label>

                            <input type="text" className="form-control" required onChange={handleChange("name")} />
                        </div>

                        <div className="form-group">
                            <label >
                                Email: 
                            </label>

                            <input type="email" className="form-control" required onChange={handleChange("email")} />
                        </div>

                        <div className="form-group">
                            <label >
                                Password: 
                            </label>

                            <input type="password" className="form-control" required onChange={handleChange("password")} />
                        </div>

                        <button className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )    
    };

    return ( 

        <Base title="Sign-Up Work's" descriptions="Page for user to sign-up">
            {signUpForm()}
        </Base>
     );
}
 
export default Signup;