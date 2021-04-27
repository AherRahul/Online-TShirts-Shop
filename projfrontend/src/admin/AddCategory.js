import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';



const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        // Backend request fired
        createCategory(user._id, token, {name})
        .then(data => {
            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            }
        })
        .catch(error => console.log(error));
    };

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };
     
    const categoryForm = () => {
        return (
            <form className="form-group py-2">
                <p className="lead">
                    Enter the category
                </p>

                <input type="text" className="form-control py-3" autoFocus required placeholder="For Ex. Summer" onChange={handleChange} value={name} />

                <button className="btn btn-outline-secondary mt-5" onClick={onSubmit} >Create Category</button>
            </form>
        )
    }

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
        <Base title="Create a Category" descriptions="Add a new category for new T-Shirt" ClassName="Container-fluid p-4 bg-secondary">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {categoryForm()}

                    {goBack()}
                </div>
            </div>
        </Base>
     );
}
 
export default AddCategory;