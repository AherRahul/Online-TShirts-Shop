import React, { Children } from 'react';
import Menu from './Menu';

const Base = ({
    title = "My Title",
    descriptions = "My Description",
    ClassName = "bg-light p-5",
    children
}) => {
    return (
        <div>
            <Menu></Menu>
            
            <div className="container-fluid p-0">
                <div className="jumbotron bg-light text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead"> {descriptions} </p>
                </div>
                <div className={ClassName}>
                    {children}
                </div>
            </div> 

            <hr />

            <footer className="footer bg-light mt-auto py-3 p-0">
                <div className="container-fluid bg-light text-center p-3">
                    <h4>If u got any question, feel free to ask</h4>
                    <button className="btn btn-warning btn-lg my-3">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An Amazing place to buy T-Shirt
                    </span>
                </div>
            </footer>          
        </div>
    )
}

export default Base;
