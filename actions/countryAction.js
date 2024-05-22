import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



export const add_country = countryData => {
    return fetch(`${API}/add_admin_country`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(countryData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




export const country_list = () => {
    return fetch(`${API}/admin_country_list`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const CountryListById = country => {
    var id={"_id":country};
    return fetch(`${API}/admin_country_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const DeleteCountryDetails = (query) => {
    return fetch(`${API}/admin_country_delete`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const update_country= countryData => {
    return fetch(`${API}/admin_country_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(countryData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

