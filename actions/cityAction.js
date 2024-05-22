import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



export const add_city = cityData => {
    return fetch(`${API}/add_city`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cityData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const city_list = () => {
    return fetch(`${API}/city_list`,{
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

export const CityListById = city => {
    var id={"_id":city};
    return fetch(`${API}/city_list_by_id`, {
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

export const update_city = cityData => {
    return fetch(`${API}/city_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cityData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const DeleteCityDetails = (query) => {
    return fetch(`${API}/city_delete`, {
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

export const city_list_by_state_id = city => {
    var id={"admin_state_id":city};
    return fetch(`${API}/city_list_by_state_id`, {
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
