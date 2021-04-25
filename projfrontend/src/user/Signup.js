import React, { userState, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    // Destructuring values object
    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false});
            } else {
                setValues({...values, name: '', email: '', password: '', error: '', success: true});
            }
        })
        .catch(console.log("Error occured during submit..!!"));
    };

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left border-1 card p-5 card-header">
                    <form>  
                        <div className="form-group">
                            <label >
                                Name: 
                            </label>

                            <input type="text" className="form-control" onChange={handleChange("name")} value={name} />
                        </div>

                        <div className="form-group">
                            <label >
                                Email: 
                            </label>

                            <input type="email" className="form-control" onChange={handleChange("email")} value={email} />
                        </div>

                        <div className="form-group">
                            <label >
                                Password: 
                            </label>

                            <input type="password" className="form-control" onChange={handleChange("password")} password={password} />
                        </div>

                        <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )    
    };

    const successMessage = () => {
        return (
            <div className="row" style={{display: success ? "" : "none"}}>
                <div className="col-md-6 offset-sm-3 text-left border-1">
                    <div className="alert alert-success" >
                        New account was created successfully. Please <Link to="/sign-in" >Login here..</Link>
                    </div>
                </div>
            </div>
        );
    };

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

    return ( 

        <Base title="Sign-Up Work's" descriptions="Page for user to sign-up">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}

            <p className="text-center">{JSON.stringify(values)}</p>
        </Base>
     );
}
 
export default Signup;