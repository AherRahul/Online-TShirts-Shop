import React from 'react';
import { Link } from 'react-router-dom';
import Base from "../core/Base";

const ManageCategories = () => {

    const goBack = () => {
        return (
            <div className="d-flex justify-content-end" style={{marginTop: -60}}>
                <Link className="btn btn-small btn-outline-info mb-3" to="/admin/dashboard">
                    Admin Home
                </Link>
            </div>
        )
    }


    return ( 
        <Base>
            <h1>Your Assignment</h1>

            {goBack()}
        </Base>
     );
}
 
export default ManageCategories;