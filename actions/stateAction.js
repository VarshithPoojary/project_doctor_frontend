import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



export const add_state = stateData => {
    return fetch(`${API}/add_state`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stateData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const state_list_by_country_id = state => {
    var id={"admin_country_id":state};
    return fetch(`${API}/state_list_by_country_id`, {
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

export const state_list = () => {
    return fetch(`${API}/state_list`,{
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

export const StateListById = state => {
    var id={"_id":state};
    return fetch(`${API}/state_list_by_id`, {
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

export const update_state = stateData => {
    return fetch(`${API}/state_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stateData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const DeleteStateDetails = (query) => {
    return fetch(`${API}/state_delete`, {
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


