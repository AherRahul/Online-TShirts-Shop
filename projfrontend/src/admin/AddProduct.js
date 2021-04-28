import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getAllCategories } from './helper/adminapicall';


const AddProduct = () => {
    
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const { 
      name, 
      description, 
      price, 
      stock, 
      photo, 
      categories, 
      category, 
      loading, 
      error, 
      createdProduct, 
      getaRedirect, 
      formData 
    } = values;

    const preLoad = () => {
      getAllCategories().then(data => {
        if (data.error) {
          setValues({...values, error: data.error});
        } else {
          setValues({...values, categories: data});
          console.log(categories);
        }
      });
    }

    useEffect(() => {
      preLoad();
    }, []);

    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const onSubmit = () => {

    }

    const handleChange = () => {

    }

    const createProductForm = () => (
      <form >
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btn-block btn-warning">
            <input onChange={handleChange("photo")} type="file" name="photo" accept="image" placeholder="choose a file" />
          </label>
        </div>
        <div className="form-group">
          <input onChange={handleChange("name")} name="photo" className="form-control" placeholder="Name" value={name} />
        </div>
        <div className="form-group">
          <textarea onChange={handleChange("description")} name="photo" className="form-control" placeholder="Description" value={description} />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")} type="number" className="form-control" placeholder="Price" value={price} />
        </div>
        <div className="form-group">
          <select onChange={handleChange("category")} className="form-control" placeholder="Category" >
            <option>Select</option>
            <option value="a">a</option>
            <option value="b">b</option>
          </select>
        </div>
        <div className="form-group">
          <input onChange={handleChange("quantity")} type="number" className="form-control" placeholder="Quantity" value={stock} />
        </div>
        
        <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
          Create Product
        </button>
      </form>
    );

    const goBack = () => {
        return (
            <div className="d-flex justify-content-end" style={{marginTop: -40}}>
                <Link className="btn btn-small btn-outline-info mb-3" to="/admin/dashboard">
                    Admin Home
                </Link>
            </div>
        )
    }

    return ( 
        <Base title="Create a product" descriptions="Add a new product for new T-Shirt" ClassName="Container-fluid p-4 bg-secondary">
            <div className="row bg-white rounded py-5">
                <div className="col-md-8 offset-md-2">
                    {createProductForm()}

                    {goBack()}
                </div>
            </div>
        </Base>
     );
}
 
export default AddProduct;