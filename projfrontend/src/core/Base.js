import React, { Children } from 'react'

const Base = ({
    title = "My Title",
    descriptions = "My Description",
    ClassName = "bg-dark text-white p-4",
    children
}) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead"> {descriptions} </p>
                </div>
                <div className={ClassName}>
                    {children}
                </div>
            </div> 

            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center">
                    <h4>If u got any question, feel free to ask</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
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
