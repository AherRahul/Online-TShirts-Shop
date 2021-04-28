import { API } from "../../backend";

// Category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
};

export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
}


// Products calls
// CREATE
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
}

// GET ALL PRODUCTS
export const getAllProducts = () => {
    return fetch(`${API}/products-for-list`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
}

// UPDATE
export const updateProduct = (userId, token, product, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
}

// GET SINGLE PRODUCT BY ID
export const getProductByID = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
}

// DELETE
export const deleteProduct = (userId, token, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
}