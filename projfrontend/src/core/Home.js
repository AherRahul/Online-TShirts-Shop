import React from 'react';
import '../styles.css';
import { API } from '../backend.js';
import Base from './Base';

export default function Home() {
    
    //console.log("API is", API);

    return (
        <Base title="Home Page" descriptions="Welcome to the T-shirt store">
            <h1 className="pb-5">Hello World, This is Rahul Aher's App</h1>
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
            </div>
        </Base>
    );
}
