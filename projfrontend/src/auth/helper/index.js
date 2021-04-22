import { API } from "../../backend";
//API means ==> http://localhost:3030/api


export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( response => {
        return response.json();
    })
    .catch( error => {
        console.log(error);
    });
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( response => {
        return response.json();
    })
    .catch( error => {
        console.log(error);
    });
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`, {
            method: "get"
        })
        .then( response => {
            console.log(response, "User log-off sucessfully..!!")
        })
        .catch( error => {
            console.log(error);
        });
    }
};

export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
        return false;
    } else {
        if (localStorage.getItem('jwt')) {
            return JSON.parse(localStorage.getItem('jwt'))
        } else {
            return false;
        }
    }
}
