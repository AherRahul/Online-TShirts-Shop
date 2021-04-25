import React from "react";
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from "react-router-dom";

const AdminDashboard = () => {

    const {user: { firstname, email, role }} = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    Admin Navigation
                </h4>

                <ul className="list-group">
                    <li className="list-group-item p-0 py-2">
                        <Link className="nav-link text-dark" to="/admin/create/category">
                            Create Category
                        </Link>
                    </li>

                    <li className="list-group-item p-0 py-2">
                        <Link className="nav-link text-dark" to="/admin/create/products">
                            Create products
                        </Link>
                    </li>

                    <li className="list-group-item p-0 py-2">
                        <Link className="nav-link text-dark" to="/admin/manage/product">
                            Manage products
                        </Link>
                    </li>

                    <li className="list-group-item p-0 py-2">
                        <Link className="nav-link text-dark" to="/admin/manage/order">
                            Create orders
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">
                    Admin information
                </h4>

                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-warning mr-2 p-2">
                            Name :
                        </span>
                        {firstname}
                    </li>

                    <li className="list-group-item">
                        <span className="badge badge-warning mr-2 p-2">
                            Email :
                        </span>
                        {email}
                    </li>

                    <li className="list-group-item">
                        <spn className="badge badge-danger p-2">
                            Admin Privilage
                        </spn>
                    </li>
                </ul>
            </div>
        )
    }

    return ( 
        <Base title="Welcome to admin area" descriptions="Manage all of your products & order's here...!" ClassName="container-fluid bg-secondary py-5">
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>
     );
}
 
export default AdminDashboard;